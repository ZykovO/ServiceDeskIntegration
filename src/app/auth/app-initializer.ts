// app-initializer.ts
import { inject } from '@angular/core';
import {TelegramService} from '../services/telegram';


export function initializeTelegram() {
  return () => {
    const telegramService = inject(TelegramService);

    try {
      // Инициализируем Telegram WebApp
      telegramService.ready();

      // Настраиваем кнопки при необходимости
      // telegramService.BackButton.show();

      console.log('Telegram WebApp initialized successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to initialize Telegram WebApp:', error);
      return Promise.resolve(); // Не блокируем загрузку приложения
    }
  };
}
