// auth.interceptor.ts с NotificationService
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from 'rxjs';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.isAuth()) {
    return next(req);
  }

  const token = authService.token;
  if (!token) return next(req);

  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError(err => {
      if (err.status === 401) {
        return refreshAndProceed(authService, req, next);
      }

      // Обрабатываем другие HTTP ошибки
      handleHttpError(err);
      return throwError(() => err);
    })
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshToken().pipe(
      switchMap(res => {
        return next(addToken(req, res.access)).pipe(
          tap(() => {
            isRefreshing$.next(false);
          })
        );
      }),
      catchError(err => {
        isRefreshing$.next(false);
        return throwError(() => err);
      })
    );
  }

  if (req.url.includes('refresh')) {
    return next(addToken(req, authService.token!));
  }

  return isRefreshing$.pipe(
    filter(isRefreshing => !isRefreshing),
    switchMap(() => {
      return next(addToken(req, authService.token!));
    })
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
};

const handleHttpError = (error: any) => {
  // Игнорируем ошибки авторизации (они обрабатываются отдельно)
  if (error.status === 401) {
    return;
  }

  // Игнорируем запросы к эндпоинтам авторизации
  if (error.url?.includes('/auth/')) {
    return;
  }

  let errorMessage = 'Произошла ошибка при выполнении запроса';
  let errorTitle = 'Ошибка сети';

  switch (error.status) {
    case 0:
      errorMessage = 'Нет соединения с сервером';
      errorTitle = 'Нет соединения';
      break;
    case 403:
      errorMessage = 'Недостаточно прав для выполнения операции';
      errorTitle = 'Доступ запрещен';
      break;
    case 404:
      errorMessage = 'Запрашиваемый ресурс не найден';
      errorTitle = 'Не найдено';
      break;
    case 422:
      errorMessage = 'Некорректные данные в запросе';
      errorTitle = 'Ошибка валидации';
      break;
    case 429:
      errorMessage = 'Слишком много запросов. Попробуйте позже.';
      errorTitle = 'Превышен лимит';
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      errorMessage = 'Ошибка сервера. Попробуйте позже.';
      errorTitle = 'Ошибка сервера';
      break;
    default:
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
  }

  // Показываем уведомление только для серьезных ошибок
  if (error.status !== 422) { // Не показываем для ошибок валидации

  }
};
