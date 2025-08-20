import {Component} from '@angular/core';
import {Ticket} from '../../../interfaces/ticket.interface';
import {StorageService} from '../../../services/local-storage-service';
import {TicketService} from '../../../services/ticket-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ticket-close-page',
  imports: [],
  templateUrl: './ticket-close-page.html',
  styleUrl: './ticket-close-page.css'
})
export class TicketClosePage {
  ticket?: Ticket | null;
  private readonly TICKET_KEY = 'currentTicket';
  private readonly FORM_KEY = 'currentTicketForm';
  isLoading = true; // Добавляем локальное состояние загрузки


  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private storage: StorageService) {
  }

  ngOnInit(): void {
    this.loadTicket();
  }

  private loadTicket(): void {
    this.isLoading = true;

    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.ticket = this.getCurrentTicket();
  }

  saveTicket(ticket: Ticket): void {
    this.storage.set(this.TICKET_KEY, ticket);
  }

  // Получить текущего пользователя
  getCurrentTicket(): Ticket | null {
    return this.storage.get<Ticket>(this.TICKET_KEY);
  }

}
