import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TelegramService} from './services/telegram';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ServiceDeskBotIntegration');

}
