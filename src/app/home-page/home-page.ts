import { Component } from '@angular/core';
import {TelegramService} from '../services/telegram';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  constructor(
    private telegram: TelegramService,
    private router: Router
  ) {
    // получаем конкретный продукт из сервиса
    this.goBack = this.goBack.bind(this);
  }


  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.telegram.BackButton.show();
    // добавляем функционал для перехода назад в телеграм
    this.telegram.BackButton.onClick(this.goBack);
  }
}
