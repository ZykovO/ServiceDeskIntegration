import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Ticket } from '../../interfaces/ticket.interface';
import { TicketService } from '../../services/ticket-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrepareNewRequest } from '../../interfaces/prepare-new-request';
import {TicketFormService} from '../../services/ticket-form-service';

@Component({
  selector: 'app-close-ticket-page',
  imports: [
    NgIf,
    NgForOf,
  ],
  templateUrl: './close-ticket-page.html',
  styleUrl: './close-ticket-page.css'
})
export class CloseTicketPage implements OnInit {
  ticket?: Ticket;
  isLoading = true;
  error?: string;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private ticketFormService: TicketFormService
  ) {}

  ngOnInit(): void {
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.get_ticket(ticketId).subscribe({
      next: (data) => {
        this.ticket = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Помилка при отриманні даних';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Переход на страницу формы закрытия тикета с подготовленными данными
   */
  goToDetailsPage(ticket: Ticket, actType: number): void {
    // Подготавливаем DTO для передачи
    const prepareRequest: PrepareNewRequest = {
      contractor_id: ticket.FormData!.contractor_id, // Нужно получить из ticket или пользователя
      ticket_id: ticket.InternalId,
      client_id: ticket.FormData!.client_id, // Нужно получить из ticket или контекста
      ticket_type: ticket.FormData!.ticket_type, // Маппинг типа ticket
      additional_number: ticket.ExternalId || '',
      act_type: actType
    };

    // Сохраняем данные в сервисе
    this.ticketFormService.setFormData(prepareRequest);

    // Переходим на страницу формы
    this.router.navigate(['/ticket', ticket.InternalId, 'close']);
  }

}
