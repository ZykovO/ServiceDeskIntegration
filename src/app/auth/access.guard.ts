import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export const canActivateAuth = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('accessToken');

  return of(accessToken).pipe(
    switchMap(tokenFromUrl => {
      if (tokenFromUrl && !authService.isAuth()) {
        const params = {
          accessToken: tokenFromUrl,
          refreshToken: urlParams.get('refreshToken'),
          baseApiUrl: urlParams.get('baseApiUrl'),
          userId: urlParams.get('userId'),
          username: urlParams.get('username'),
          // Добавляем недостающие поля
          id: Number(urlParams.get('userId')),
          first_name: urlParams.get('first_name') || '',
          last_name: urlParams.get('last_name') || '',
          language_code: urlParams.get('language_code') || 'en',
          allows_write_to_pm: urlParams.get('allows_write_to_pm') === 'true',
          photo_url: urlParams.get('photo_url') || ''
        };

        authService.initializeFromTelegram(params);

        // Очищаем URL
        window.history.replaceState({}, document.title, window.location.pathname);

        return of(true);
      }

      if (authService.isAuth()) {
        return of(true);
      }

      // Если нет токена, пробуем через Telegram
      return authService.authenticateWithTelegram().pipe(
        map(success => {
          if (!success) {
            console.log('Authentication failed, redirecting to login');
            router.navigate(['/login']);
          }
          return success;
        }),
        catchError(err => {
          console.error('Authentication error:', err);
          router.navigate(['/login']);
          return of(false);
        })
      );
    })
  );
};
