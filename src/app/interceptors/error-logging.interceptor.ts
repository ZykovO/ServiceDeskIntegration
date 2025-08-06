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

export const errorLoggingInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Сериализация request body
      let requestBody: string;
      try {
        requestBody = req.body ? JSON.stringify(req.body, null, 2) : 'null';
      } catch {
        requestBody = String(req.body);
      }

      // Сериализация error response
      let errorResponse: string;
      try {
        errorResponse = err.error ? JSON.stringify(err.error, null, 2) : 'null';
      } catch {
        errorResponse = String(err.error);
      }

      const message = `
❌ HTTP Error
URL: ${req.url}
Method: ${req.method}
Status: ${err.status} (${err.statusText})
Error Message: ${err.message}
Error Response: ${errorResponse}
      `;

      console.error(message);

      notificationService.showError(message, 'Ошибка HTTP', 10000);

      return throwError(() => err);
    })
  );
};
