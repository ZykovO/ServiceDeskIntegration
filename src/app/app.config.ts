import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from './auth/auth.interceptor';
import {initializeTelegram} from './auth/app-initializer';
import {TelegramService} from './services/telegram';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authTokenInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeTelegram,
      deps: [TelegramService],
      multi: true
    }
  ]
};
