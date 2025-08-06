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
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error intercepted:');
      console.log('URL:', req.url);
      console.log('Method:', req.method);
      console.log('Request body:', req.body);
      console.log('Headers:', req.headers);
      console.log('Error status:', error.status);
      console.log('Error message:', error.message);
      console.log('Error response:', error.error);

      notificationService.showError(
        `Ошибка запроса к ${req.url}`,
        `Статус: ${error.status}`,
        7000
      );

      return throwError(() => error);
    })
  );
};
