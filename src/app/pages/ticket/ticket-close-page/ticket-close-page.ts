import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../../interfaces/ticket.interface';
import {StorageService} from '../../../services/local-storage-service';
import {TicketService} from '../../../services/ticket-service';
import {ActivatedRoute} from '@angular/router';
import {JsonPipe} from '@angular/common';
import {PrepareNewRequest} from '../../../interfaces/prepare-new-request';
import {PrepareNewFormResponse} from '../../../interfaces/preparenew.response.interface';
import {Skeleton} from 'primeng/skeleton';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-ticket-close-page',
  imports: [
    JsonPipe,
    Skeleton,
    Message
  ],
  templateUrl: './ticket-close-page.html',
  styleUrl: './ticket-close-page.css'
})
export class TicketClosePage implements OnInit {
  ticket?: Ticket | null;
  actType?: number | null;
  private readonly TICKET_KEY = 'currentTicket';
  private readonly FORM_KEY = 'currentTicketForm';
  isLoading = true; // Добавляем локальное состояние загрузки
  formFields?:PrepareNewFormResponse|null;


  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private storage: StorageService) {
  }

  ngOnInit(): void {
    console.log('Start Close ticket')
    this.isLoading = true;
    this.loadTicket();
    this.getFormFields();
    this.isLoading = false;
  }

  private loadTicket(): void {


    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.actType= Number(this.route.snapshot.paramMap.get('actType'));
    this.ticket = this.getCurrentTicket();


  }

  getFormFields() {
    if (this.ticket && this.actType) {
      const prepareRequest: PrepareNewRequest = {
        contractor_id: this.ticket.FormData!.contractor_id, // Нужно получить из ticket или пользователя
        ticket_id: this.ticket.InternalId,
        client_id: this.ticket.FormData!.client_id, // Нужно получить из ticket или контекста
        ticket_type: this.ticket.FormData!.ticket_type, // Маппинг типа ticket
        additional_number: this.ticket.ExternalId || '',
        act_type: this.actType
      };
      this.ticketService.get_preparenew(prepareRequest).subscribe(
        { next: (preparenewForm) => {
            this.formFields=preparenewForm
          } }
      )
      console.log(prepareRequest)
      return null
    }
    else {
      return null
    }

  }

  saveTicket(ticket: Ticket): void {
    this.storage.set(this.TICKET_KEY, ticket);
  }

  // Получить текущего пользователя
  getCurrentTicket(): Ticket | null {
    return this.storage.get<Ticket>(this.TICKET_KEY);
  }

}
