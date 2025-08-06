// notification.component.ts (с анимациями)
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from './notification.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div class="notifications-container">
      <div
        *ngFor="let notification of notifications; trackBy: trackByFn"
        class="notification"
        [ngClass]="'notification--' + notification.type"
        [@slideInOut]>

        <div class="notification__icon">
          <ng-container [ngSwitch]="notification.type">
            <!-- Success Icon -->
            <svg *ngSwitchCase="'success'" class="icon icon--success" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <!-- Error Icon -->
            <svg *ngSwitchCase="'error'" class="icon icon--error" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            <!-- Warning Icon -->
            <svg *ngSwitchCase="'warning'" class="icon icon--warning" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            <!-- Info Icon -->
            <svg *ngSwitchCase="'info'" class="icon icon--info" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </ng-container>
        </div>

        <div class="notification__content">
          <div *ngIf="notification.title" class="notification__title">
            {{ notification.title }}
          </div>
          <div class="notification__message">
            {{ notification.message }}
          </div>
        </div>

        <button
          *ngIf="notification.closable"
          class="notification__close"
          (click)="closeNotification(notification.id)"
          aria-label="Закрыть уведомление">
          <svg viewBox="0 0 24 24" class="close-icon">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <!-- Progress bar для автозакрытия -->
        <div *ngIf="notification.duration && notification.duration > 0"
             class="notification__progress">
          <div class="notification__progress-bar"
               [style.animation-duration]="notification.duration + 'ms'"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
      max-width: calc(100vw - 40px);
    }

    .notification {
      position: relative;
      display: flex;
      align-items: flex-start;
      min-width: 300px;
      max-width: 500px;
      margin-bottom: 12px;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      pointer-events: auto;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      overflow: hidden;
    }

    .notification:hover {
      transform: translateX(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
    }

    .notification--success {
      background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
      border: 1px solid #28a745;
      border-left: 4px solid #28a745;
      color: #155724;
    }

    .notification--error {
      background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
      border: 1px solid #dc3545;
      border-left: 4px solid #dc3545;
      color: #721c24;
    }

    .notification--warning {
      background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
      border: 1px solid #ffc107;
      border-left: 4px solid #ffc107;
      color: #856404;
    }

    .notification--info {
      background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
      border: 1px solid #17a2b8;
      border-left: 4px solid #17a2b8;
      color: #0c5460;
    }

    .notification__icon {
      flex-shrink: 0;
      margin-right: 12px;
      margin-top: 2px;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .icon--success { color: #28a745; }
    .icon--error { color: #dc3545; }
    .icon--warning { color: #ffc107; }
    .icon--info { color: #17a2b8; }

    .notification__content {
      flex: 1;
      min-width: 0; /* Для корректного переноса длинных строк */
    }

    .notification__title {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 15px;
      line-height: 1.3;
    }

    .notification__message {
      font-size: 14px;
      line-height: 1.4;
      word-wrap: break-word;
      opacity: 0.9;
    }

    .notification__close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      margin: -4px -4px -4px 8px;
      border-radius: 6px;
      transition: all 0.2s;
      color: currentColor;
      opacity: 0.6;
    }

    .notification__close:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
    }

    .close-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    .notification__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .notification__progress-bar {
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      animation: progressBar linear;
      transform-origin: left;
    }

    @keyframes progressBar {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }

    /* Темная тема - можно добавить через класс */
    .dark .notification--success {
      background: linear-gradient(135deg, #1e4d2b 0%, #2d5f3f 100%);
      color: #a3d9a5;
      border-color: #28a745;
    }

    .dark .notification--error {
      background: linear-gradient(135deg, #4d1e1e 0%, #5f2d2d 100%);
      color: #f1a3a3;
      border-color: #dc3545;
    }

    .dark .notification--warning {
      background: linear-gradient(135deg, #4d4d1e 0%, #5f5f2d 100%);
      color: #f1f1a3;
      border-color: #ffc107;
    }

    .dark .notification--info {
      background: linear-gradient(135deg, #1e4d4d 0%, #2d5f5f 100%);
      color: #a3f1f1;
      border-color: #17a2b8;
    }

    @media (max-width: 600px) {
      .notifications-container {
        left: 10px;
        right: 10px;
        top: 10px;
        max-width: none;
      }

      .notification {
        min-width: auto;
        max-width: none;
        margin-bottom: 8px;
        padding: 12px;
      }

      .notification__title {
        font-size: 14px;
      }

      .notification__message {
        font-size: 13px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .notification {
        transition: none;
      }

      .notification:hover {
        transform: none;
      }

      .notification__close:hover {
        transform: none;
      }

      .notification__progress-bar {
        animation: none;
      }
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private subscription?: Subscription;

  notifications: Notification[] = [];

  ngOnInit() {
    this.subscription = this.notificationService.notifications.subscribe(
      notifications => {
        this.notifications = notifications;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closeNotification(id: string) {
    this.notificationService.removeNotification(id);
  }

  trackByFn(index: number, item: Notification): string {
    return item.id;
  }
}
