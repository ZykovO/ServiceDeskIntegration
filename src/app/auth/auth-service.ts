// auth-service.ts с интеграцией NotificationService
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError, Observable, of, map } from 'rxjs';
import { RefreshTokenResponse, TokenResponse, UserResponse } from './auth-interface';
import { Router } from '@angular/router';
import { TelegramService } from '../services/telegram';

import { environment } from '../../environments/environment';

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

    sessionStorage.setItem('telegram_auth', JSON.stringify(params));
    console.log('Auth data saved to sessionStorage');

    // Показываем уведомление об успешной авторизации
  }

  isAuth(): boolean {
    console.log('isAuth check - current token:', !!this.token);

    if (!this.token) {
      const telegramAuth = sessionStorage.getItem('telegram_auth');
      console.log('Checking sessionStorage for auth data:', !!telegramAuth);

      if (telegramAuth) {
        try {
          const params = JSON.parse(telegramAuth);
          // Тихая инициализация без уведомления
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

  authenticateWithTelegram(): Observable<boolean> {
    console.log('Starting Telegram authentication');

    try {
      const initData = this.telegramService.initData;
      const initDataUnsafe = this.telegramService.initDataUnsafe;

      console.log('initData available:', !!initData);
      console.log('initDataUnsafe available:', !!initDataUnsafe);
      console.log('user data available:', !!initDataUnsafe?.user);

      if (!initData || !initDataUnsafe?.user) {
        console.error('Cannot authenticate: missing Telegram data');
        return of(false);
      }

      this.baseApiUrl = this.getBaseApiUrl();
      console.log('Base API URL:', this.baseApiUrl);

      const payload = {
        initData: initData,
        user: initDataUnsafe.user
      };

      console.log('Making request to:', `${this.baseApiUrl}/auth/telegram/`);

      return this.http.post<TokenResponse>(
        `${this.baseApiUrl}/auth/telegram/`,
        payload
      ).pipe(
        tap(response => {
          console.log('Telegram auth response:', response);

          this.token = response.access;
          this.refresh = response.refresh;
          this.user = response.user;

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

          // Показываем успешное уведомление
        }),
        map(() => true),
        catchError(error => {
          console.error('Telegram authentication failed:', error);

          // Обрабатываем разные типы ошибок
          let errorMessage = 'Неизвестная ошибка авторизации';
          let errorTitle = 'Ошибка авторизации';

          if (error.status === 0) {
            errorMessage = `Не удается подключиться к серверу. Проверьте интернет-соединение. ${error}`;
            errorTitle = 'Нет соединения';
          } else if (error.status === 401) {
            errorMessage = 'Неверные данные авторизации';
            errorTitle = 'Доступ запрещен';
          } else if (error.status === 403) {
            errorMessage = 'У вас нет доступа к этому приложению';
            errorTitle = 'Доступ запрещен';
          } else if (error.status >= 500) {
            errorMessage = 'Ошибка сервера. Попробуйте позже.';
            errorTitle = 'Ошибка сервера';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }

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

    const userName = this.user?.first_name || this.user?.username || 'Пользователь';

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
      tap(res => {
        console.log('Token refreshed successfully');
        this.token = res.access;

        // Обновляем в sessionStorage
        const telegramAuth = sessionStorage.getItem('telegram_auth');
        if (telegramAuth) {
          const params = JSON.parse(telegramAuth);
          params.accessToken = res.access;
          sessionStorage.setItem('telegram_auth', JSON.stringify(params));
        }

        // Показываем информационное уведомление (можно отключить)
        // this.notificationService.showInfo('Сессия обновлена', '', 2000);
      }),
      catchError(err => {
        console.error('Token refresh failed:', err);

        let errorMessage = 'Не удалось обновить токен авторизации';
        if (err.status === 401) {
          errorMessage = 'Сессия истекла. Необходимо войти заново.';
        } else if (err.status === 0) {
          errorMessage = 'Нет соединения с сервером';
        }
        this.logout();
        return throwError(() => err);
      })
    );
  }

  private getBaseApiUrl(): string {
    return environment.apiUrl;
  }
}
