import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TelegramService} from './services/telegram';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ServiceDeskBotIntegration');

}
