import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket-service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../../interfaces/ticket.interface';
import { finalize } from 'rxjs/operators';
import {DatePipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import { Card } from 'primeng/card';
import { Chip } from 'primeng/chip';
import { Accordion } from 'primeng/accordion';
import { Timeline } from 'primeng/timeline';
import { Button } from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {Message} from 'primeng/message';
import {Fieldset} from 'primeng/fieldset';

@Component({
  selector: 'app-ticket-view-page',
  imports: [
    Card,
    Chip,
    NgIf,
    DatePipe,
    Accordion,
    NgForOf,
    Timeline,
    Button,
    PrimeTemplate,
    Skeleton,
    JsonPipe,
    Message,
    Fieldset
  ],
  templateUrl: './ticket-view-page.html',
  styleUrl: './ticket-view-page.css'
})
export class TicketViewPage implements OnInit {
  ticket?: Ticket;
  error?: string;
  isLoading = true; // Добавляем локальное состояние загрузки

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadTicket();
  }

  private loadTicket(): void {
    this.isLoading = true;

    const ticketId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(ticketId)) {
      this.error = 'Неверный ID заявки';
      this.isLoading = false;
      return;
    }

    this.ticketService.get_ticket(ticketId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.ticket = data;
          console.log(data)
          this.error = undefined;
        },
        error: (err) => {
          this.error = 'Ошибка при получении данных заявки';
          console.error('Ошибка загрузки заявки:', err);
          this.ticket = undefined;
        }
      });
  }

  // Остальные методы остаются без изменений
  isDeadlineExpired(deadline: string | null): boolean {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  }



  executeAction(action: number): void {
    console.log('Выполняется действие:', action);
  }
}
