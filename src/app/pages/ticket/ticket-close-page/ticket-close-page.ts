import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../../interfaces/ticket.interface';
import {StorageService} from '../../../services/local-storage-service';
import {TicketService} from '../../../services/ticket-service';
import {ActivatedRoute} from '@angular/router';
import {JsonPipe, NgClass} from '@angular/common';
import {PrepareNewRequest} from '../../../interfaces/prepare-new-request';
import {
  FormField,
  FormSelect,
  FormSelectOption,
  PrepareNewFormResponse
} from '../../../interfaces/preparenew.response.interface';
import {Skeleton} from 'primeng/skeleton';
import {Message} from 'primeng/message';
import {FileUpload} from 'primeng/fileupload';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {Card} from 'primeng/card';
import {Fluid} from 'primeng/fluid';
import {DatePicker} from 'primeng/datepicker';
import {MultiSelect} from 'primeng/multiselect';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-ticket-close-page',
  imports: [
    JsonPipe,
    Skeleton,
    Message,
    FileUpload,
    InputText,
    ReactiveFormsModule,
    Select,
    Textarea,
    FormsModule,
    NgClass,
    Card,
    Fluid,
    DatePicker,
    MultiSelect,
    PrimeTemplate
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
  getFieldType(field: FormField): string {
    // Обрабатываем несоответствие в названиях полей
    if ('field_type' in field) {
      return field.field_type;
    }
    return 'unknown';
  }
  isFormSelect(field: FormField): field is FormSelect {
    return this.getFieldType(field) === 'select';
  }
  getSelectOptions(field: FormField): FormSelectOption[] {
    if (this.isFormSelect(field)) {
      return field.options;
    }
    return [];
  }
}
