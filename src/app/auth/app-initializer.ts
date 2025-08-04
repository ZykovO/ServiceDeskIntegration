// app-initializer.ts
import { inject } from '@angular/core';
import {TelegramService} from '../services/telegram';


export function initializeTelegram() {
  const telegramService = inject(TelegramService);

  return () => {
    try {
      telegramService.ready();
      console.log('Telegram WebApp initialized successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to initialize Telegram WebApp:', error);
      return Promise.resolve();
    }
  };
}
