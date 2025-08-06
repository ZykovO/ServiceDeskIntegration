import { TelegramService } from '../services/telegram';

export function initializeTelegram() {
  return (telegramService: TelegramService) => {
    return new Promise<void>((resolve) => {
      try {
        // Проверяем, доступен ли Telegram WebApp
        // @ts-ignore
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          telegramService.ready();
          console.log('Telegram WebApp initialized successfully');
        } else {
          console.warn('Telegram WebApp not available');
        }
        resolve();
      } catch (error) {
        console.error('Failed to initialize Telegram WebApp:', error);
        resolve(); // Не блокируем загрузку приложения
      }
    });
  };
}
