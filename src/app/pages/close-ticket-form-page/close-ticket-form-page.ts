import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketService } from '../../services/ticket-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../interfaces/ticket.interface';
import { JsonPipe, NgIf } from '@angular/common';
import { PrepareNewRequest } from '../../interfaces/prepare-new-request';

import { Subscription } from 'rxjs';
import {TicketFormService} from '../../services/ticket-form-service';
import {TelegramService} from '../../services/telegram';

@Component({
  selector: 'app-close-ticket-form-page',
  imports: [
    NgIf,
    JsonPipe
  ],
  templateUrl: './close-ticket-form-page.html',
  styleUrl: './close-ticket-form-page.css'
})
export class CloseTicketFormPage implements OnInit, OnDestroy {
  requestData: PrepareNewRequest | null = null;
  loading: boolean = false;
  error: string | null = null;

  private formDataSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private ticketFormService: TicketFormService,
    private telegramService: TelegramService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // Подписываемся на данные из сервиса
    this.formDataSubscription = this.ticketFormService.formData$.subscribe({
      next: (data) => {
        if (data) {
          this.requestData = data;
          this.loading = false;
          console.log('Получены данные из сервиса:', data);
        } else {
          // Если данных нет в сервисе, пытаемся восстановить их
          this.restoreDataFromRoute();
        }
      },
      error: (err) => {
        this.error = 'Ошибка при получении данных из сервиса';
        this.loading = false;
        console.error('Service error:', err);
      }
    });
  }

  ngOnDestroy(): void {
    // Отписываемся от подписки
    if (this.formDataSubscription) {
      this.formDataSubscription.unsubscribe();
    }
  }

  /**
   * Восстановление данных по ticket ID из роута
   * Используется как fallback, если данных нет в сервисе
   */
  private restoreDataFromRoute(): void {
    const ticketId = this.route.snapshot.paramMap.get('ticketId');
    if (ticketId) {
      console.log('Восстанавливаем данные для ticket ID:', ticketId);

      // Получаем данные тикета заново
      this.ticketService.get_ticket(Number(ticketId)).subscribe({
        next: (ticket) => {
          // Создаем базовый PrepareNewRequest из данных тикета
          const prepareRequest: PrepareNewRequest = {
            contractor_id: 0, // Нужно определить логику получения
            equipment_repair: '',
            problem_description: '',
            incoming_ttn: '',
            text: '',
            ticket_id: ticket.InternalId,
            client_id: 0, // Нужно определить логику получения
            ticket_type: 0, // Нужно замапить из ticket.Type
            additional_number: ticket.ExternalId || '',
            act_type: 0 // Без act_type, так как он не был передан
          };

          this.requestData = prepareRequest;
          this.ticketFormService.setFormData(prepareRequest);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Помилка при отриманні даних тікета';
          this.loading = false;
          console.error('Ticket fetch error:', err);
        }
      });
    } else {
      this.error = 'ID тікета не знайдено в URL';
      this.loading = false;
    }
  }

  /**
   * Обновление данных формы
   * Можно использовать для изменения отдельных полей
   */
  updateFormField(field: keyof PrepareNewRequest, value: any): void {
    if (this.requestData) {
      const updatedData = { ...this.requestData, [field]: value };
      this.requestData = updatedData;
      this.ticketFormService.setFormData(updatedData);
    }
  }

  /**
   * Отправка данных на сервер
   */
  submitForm(): void {
    if (!this.requestData) {
      this.error = 'Нет данных для отправки';
      return;
    }

    this.loading = true;

    // Здесь будет вызов API для отправки данных
    // Например: this.ticketService.closeTicket(this.requestData)
    this.ticketService.get_preparenew(this.requestData).subscribe(

    )
    console.log('Отправляем данные:', this.requestData);

    // Имитация отправки
    setTimeout(() => {
      this.loading = false;
      // После успешной отправки можно очистить данные
      this.ticketFormService.clearFormData();
      // И перейти на другую страницу
      // this.router.navigate(['/tickets']);
    }, 1000);
  }

  /**
   * Возврат на предыдущую страницу
   */
  goBack(): void {
    // Очищаем данные при возврате
    this.ticketFormService.clearFormData();

    // Проверяем, доступен ли Telegram WebApp API
    this.telegramService.close()
  }
}
