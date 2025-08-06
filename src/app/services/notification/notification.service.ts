// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number; // в миллисекундах, 0 = не закрывать автоматически
  closable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private notificationCounter = 0;

  // Публичный Observable для подписки в компоненте
  public notifications = this.notifications$.asObservable();

  // Показать уведомление об ошибке
  showError(message: string, title?: string, duration: number = 5000) {
    this.addNotification({
      type: 'error',
      title: title || 'Ошибка',
      message,
      duration,
      closable: true
    });
  }

  // Показать успешное уведомление
  showSuccess(message: string, title?: string, duration: number = 3000) {
    this.addNotification({
      type: 'success',
      title: title || 'Успешно',
      message,
      duration,
      closable: true
    });
  }

  // Показать предупреждение
  showWarning(message: string, title?: string, duration: number = 4000) {
    this.addNotification({
      type: 'warning',
      title: title || 'Внимание',
      message,
      duration,
      closable: true
    });
  }

  // Показать информационное уведомление
  showInfo(message: string, title?: string, duration: number = 4000) {
    this.addNotification({
      type: 'info',
      title: title || 'Информация',
      message,
      duration,
      closable: true
    });
  }

  // Добавить кастомное уведомление
  addNotification(notification: Omit<Notification, 'id'>) {
    const id = this.generateId();
    const newNotification: Notification = {
      id,
      closable: true,
      duration: 4000,
      ...notification
    };

    const currentNotifications = this.notifications$.value;
    this.notifications$.next([...currentNotifications, newNotification]);

    // Автоматическое закрытие через заданное время
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, newNotification.duration);
    }
  }

  // Удалить уведомление по ID
  removeNotification(id: string) {
    const currentNotifications = this.notifications$.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notifications$.next(updatedNotifications);
  }

  // Очистить все уведомления
  clearAll() {
    this.notifications$.next([]);
  }

  private generateId(): string {
    return `notification-${++this.notificationCounter}-${Date.now()}`;
  }
}
