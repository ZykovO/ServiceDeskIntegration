// auth-service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError, Observable, of, map } from 'rxjs';
import { RefreshTokenResponse, TokenResponse, UserResponse } from './auth-interface';
import { Router } from '@angular/router';
import {TelegramService} from '../services/telegram';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private telegramService = inject(TelegramService);

  token: string | null = null;
  refresh: string | null = null;
  user: UserResponse | null = null;
  baseApiUrl: string | null = null;

  initializeFromTelegram(params: any) {
    this.token = params.accessToken;
    this.refresh = params.refreshToken;
    this.baseApiUrl = params.baseApiUrl;
    this.user = {
      id: params.id,
      first_name: params.first_name,
      last_name: params.last_name,
      username: params.username,
      language_code: params.language_code,
      allows_write_to_pm: params.allows_write_to_pm,
      photo_url: params.photo_url
    };

    // Сохраняем в sessionStorage
    sessionStorage.setItem('telegram_auth', JSON.stringify(params));
  }

  isAuth(): boolean {
    if (!this.token) {
      const telegramAuth = sessionStorage.getItem('telegram_auth');
      if (telegramAuth) {
        const params = JSON.parse(telegramAuth);
        this.initializeFromTelegram(params);
      }
    }
    return !!this.token;
  }

  // Новый метод для авторизации через Telegram
  authenticateWithTelegram(): Observable<boolean> {
    console.log('Starting Telegram authentication');

    try {
      const initData = this.telegramService.initData;
      const initDataUnsafe = this.telegramService.initDataUnsafe;

      // Проверка наличия данных
      if (!initData) {
        console.warn('Telegram initData is missing');
      }
      if (!initDataUnsafe?.user) {
        console.warn('Telegram user data is missing');
      }

      // Если нет ни initData, ни user, возвращаем false
      if (!initData || !initDataUnsafe?.user) {
        console.error('Cannot authenticate: missing Telegram data');
        return of(false);
      }

      // Получаем базовый URL API
      this.baseApiUrl = this.getBaseApiUrl();
      console.log('Base API URL:', this.baseApiUrl);

      const payload = {
        initData: initData,
        user: initDataUnsafe.user
      };

      console.log('Payload for backend:', payload);

      // Отправляем запрос на бэкенд
      return this.http.post<TokenResponse>(
        `${this.baseApiUrl}/auth/telegram/`,
        payload
      ).pipe(
        tap(response => {
          console.log('Telegram auth response:', response);

          // Сохраняем токены и пользователя
          this.token = response.access;
          this.refresh = response.refresh;
          this.user = response.user;

          // Сохраняем в sessionStorage
          const authParams = {
            accessToken: response.access,
            refreshToken: response.refresh,
            baseApiUrl: this.baseApiUrl,
            userId: response.user.id,
            username: response.user.username
          };
          sessionStorage.setItem('telegram_auth', JSON.stringify(authParams));

          console.log('SessionStorage updated:', authParams);
        }),
        map(() => true),
        catchError(error => {
          console.error('Telegram authentication failed:', error);
          return of(false);
        })
      );
    } catch (error) {
      console.error('Unexpected error during Telegram authentication:', error);
      return of(false);
    }
  }


  logout() {
    this.token = null;
    this.refresh = null;
    this.user = null;
    this.baseApiUrl = null;
    sessionStorage.removeItem('telegram_auth');
    this.router.navigate(['/login']);
  }

  refreshToken() {
    if (!this.refresh) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<RefreshTokenResponse>(
      `${this.baseApiUrl}/auth/refresh/`,
      { refresh: this.refresh }
    ).pipe(
      catchError(err => {
        this.logout();
        return throwError(() => err);
      }),
      tap(res => {
        this.token = res.access;
        // Обновляем в sessionStorage
        const telegramAuth = sessionStorage.getItem('telegram_auth');
        if (telegramAuth) {
          const params = JSON.parse(telegramAuth);
          params.accessToken = res.access;
          sessionStorage.setItem('telegram_auth', JSON.stringify(params));
        }
      })
    );
  }

  // Вспомогательный метод для получения базового URL API
  private getBaseApiUrl(): string {
    // Можно вынести в environment или конфигурацию
    return `${environment.apiUrl}`;
  }
}
