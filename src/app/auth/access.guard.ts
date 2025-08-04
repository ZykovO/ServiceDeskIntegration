// access.guard.ts
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';

export const canActivateAuth = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Сначала проверяем параметры URL (при первом открытии из Telegram с прямыми параметрами)
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('accessToken');

  if (accessToken && !authService.isAuth()) {
    const params = {
      accessToken: urlParams.get('accessToken'),
      refreshToken: urlParams.get('refreshToken'),
      baseApiUrl: urlParams.get('baseApiUrl'),
      userId: urlParams.get('userId'),
      username: urlParams.get('username')
    };
    authService.initializeFromTelegram(params);


    // Очищаем URL от параметров
    window.history.replaceState({}, document.title, window.location.pathname);
    return true;
  }

  // Проверяем существующую авторизацию
  if (authService.isAuth()) {
    return true;
  }

  // Если нет токена, пытаемся получить его через Telegram
  return authService.authenticateWithTelegram().pipe(
    map(success => {
      if (success) {
        return true;
      } else {
        // Если авторизация через Telegram не удалась, перенаправляем на логин
        // router.navigate(['/login']);
        return false;
      }
    }),
    catchError(error => {
      console.error('Authentication error:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
