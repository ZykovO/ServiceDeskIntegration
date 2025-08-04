import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TelegramService} from '../../services/telegram';
import {AuthService} from '../../auth/auth-service';
import {NgIf} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-app-login',
  imports: [
    NgIf
  ],
  templateUrl: './app-login.html',
  styleUrl: './app-login.css'
})
export class AppLogin implements OnInit {
  private authService = inject(AuthService);
  private telegramService = inject(TelegramService);
  private router = inject(Router);

  isLoading = false;
  isTelegramAvailable = false;
  errorMessage = '';

  ngOnInit() {
    // Проверяем, доступен ли Telegram WebApp
    this.checkTelegramAvailability();

    // Если пользователь уже авторизован, перенаправляем
    if (this.authService.isAuth()) {
      this.router.navigate(['/']);
    }
  }

  private checkTelegramAvailability() {
    try {
      const initData = this.telegramService.initData;
      const initDataUnsafe = this.telegramService.initDataUnsafe;

      // this.isTelegramAvailable = !!(initData && initDataUnsafe?.user);
      //
      // if (!this.isTelegramAvailable) {
      //   this.errorMessage = 'Откройте приложение из Telegram';
      // }
    } catch (error) {
      console.error('Telegram check error:', error);
      this.isTelegramAvailable = false;
      this.errorMessage = 'Ошибка при проверке Telegram';
    }
  }

  loginWithTelegram() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.authenticateWithTelegram().subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Ошибка авторизации через Telegram';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка авторизации: ' + (error.message || 'Неизвестная ошибка');
        console.error('Login error:', error);
      }
    });
  }

  protected readonly environment = environment;
}
