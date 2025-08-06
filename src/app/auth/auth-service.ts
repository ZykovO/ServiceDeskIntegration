// auth-service.ts с улучшенным дебагом
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
    console.log('initializeFromTelegram called with:', params);

    this.token = params.accessToken;
    this.refresh = params.refreshToken;
    this.baseApiUrl = params.baseApiUrl;
    this.user = {
      id: params.id || params.userId,
      first_name: params.first_name,
      last_name: params.last_name,
      username: params.username,
      language_code: params.language_code,
      allows_write_to_pm: params.allows_write_to_pm,
      photo_url: params.photo_url
    };

    // Сохраняем в sessionStorage
    sessionStorage.setItem('telegram_auth', JSON.stringify(params));
    console.log('Auth data saved to sessionStorage');
  }

  isAuth(): boolean {
    console.log('isAuth check - current token:', !!this.token);

    if (!this.token) {
      const telegramAuth = sessionStorage.getItem('telegram_auth');
      console.log('Checking sessionStorage for auth data:', !!telegramAuth);

      if (telegramAuth) {
        try {
          const params = JSON.parse(telegramAuth);
          this.initializeFromTelegram(params);
          console.log('Auth restored from sessionStorage');
        } catch (error) {
          console.error('Error parsing sessionStorage auth data:', error);
          sessionStorage.removeItem('telegram_auth');
        }
      }
    }

    const isAuthenticated = !!this.token;
    console.log('Final isAuth result:', isAuthenticated);
    return isAuthenticated;
  }

  // Новый метод для авторизации через Telegram
  authenticateWithTelegram(): Observable<boolean> {
    console.log('Starting Telegram authentication');
    // @ts-ignore
    console.log('Window Telegram object:', typeof window !== 'undefined' ? !!window.Telegram : 'no window');

    try {
      const initData = this.telegramService.initData;
      const initDataUnsafe = this.telegramService.initDataUnsafe;

      console.log('initData available:', !!initData);
      console.log('initDataUnsafe available:', !!initDataUnsafe);
      console.log('user data available:', !!initDataUnsafe?.user);

      // Проверка наличия данных
      if (!initData) {
        console.warn('Telegram initData is missing');
      }
      if (!initDataUnsafe?.user) {
        console.warn('Telegram user data is missing');
        console.log('initDataUnsafe content:', initDataUnsafe);
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
      console.log('Making request to:', `${this.baseApiUrl}/auth/telegram/`);

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
            username: response.user.username,
            id: response.user.id,
            first_name: response.user.first_name,
            last_name: response.user.last_name,
            language_code: response.user.language_code,
            allows_write_to_pm: response.user.allows_write_to_pm,
            photo_url: response.user.photo_url
          };
          sessionStorage.setItem('telegram_auth', JSON.stringify(authParams));

          console.log('SessionStorage updated:', authParams);
        }),
        map(() => true),
        catchError(error => {
          console.error('Telegram authentication failed:', error);
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            error: error.error
          });
          return of(false);
        })
      );
    } catch (error) {
      console.error('Unexpected error during Telegram authentication:', error);
      return of(false);
    }
  }

  logout() {
    console.log('Logging out...');
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
    return environment.apiUrl;
  }
}
