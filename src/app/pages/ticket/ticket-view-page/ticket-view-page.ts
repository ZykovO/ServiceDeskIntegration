import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket-service';
import {ActivatedRoute, Router} from '@angular/router';
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
import {StorageService} from '../../../services/local-storage-service';
import {routes} from '../../../app.routes';


@Component({
  selector: 'app-ticket-view-page',
  imports: [
    Card,
    Chip,
    NgIf,
    DatePipe,
    NgForOf,
    Button,
    PrimeTemplate,
    Skeleton,
    Fieldset
  ],
  templateUrl: './ticket-view-page.html',
  styleUrl: './ticket-view-page.css'
})
export class TicketViewPage implements OnInit {
  ticket?: Ticket | null;
  error?: string;
  isLoading = true; // Добавляем локальное состояние загрузки
  private readonly TICKET_KEY = 'currentTicket';

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private routers: Router,
    private storage: StorageService
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
    if (this.getCurrentTicket()) {
      this.ticket = this.getCurrentTicket();
      console.log(this.ticket);
      this.isLoading = false;
      return;
    }

    this.ticketService.get_ticket(ticketId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (this.ticket) {
            this.saveTicket(this.ticket);
          }
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
    this.routers.navigate(['ticket', this.ticket?.InternalId,'close',action]);
  }


  saveTicket(ticket: Ticket): void {
    this.storage.set(this.TICKET_KEY, ticket);
  }

  getCurrentTicket(): Ticket | null {
    return this.storage.get<Ticket>(this.TICKET_KEY);
  }
}
