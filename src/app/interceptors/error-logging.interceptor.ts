// error-logging.interceptor.ts
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';

export const errorLoggingInterceptor: HttpInterceptorFn = (req, next)=> {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // Можно логировать успешные ответы
        // console.log('HTTP Response:', req.url, event);
        notificationService.showError(
          `Выполнен запрос к ${req.url}`,
          `Статус: ${event.status}`,
          7000
        );
      }
    }),
    catchError(err => {
      console.error('HTTP Error intercepted:');
      console.log('URL:', req.url);
      console.log('Method:', req.method);
      console.log('Request body:', req.body);
      console.log('Headers:', req.headers);
      console.log('Error status:', err.status);
      console.log('Error message:', err.message);
      console.log('Error response:', err.error);

      notificationService.showError(
        `Ошибка запроса к ${req.url}`,
        `Статус: ${err.status}`,
        7000
      );

      return throwError(() => err);
    })
  )
};
