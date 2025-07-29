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
    this.telegram.BackButton.onClick(this.goBack);

    const initData = this.telegram.initData;
    const user = this.telegram.initDataUnsafe?.user;

    console.log('initData:', initData);
    console.log('Telegram user:', user);
  }

}
