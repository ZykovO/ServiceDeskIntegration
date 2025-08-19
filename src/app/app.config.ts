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
import {errorLoggingInterceptor} from './interceptors/error-logging.interceptor';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {TelegramPreset} from './app-layout/mypreset';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: TelegramPreset
      }
    }),
    provideHttpClient(
      withInterceptors([authTokenInterceptor, errorLoggingInterceptor])
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
