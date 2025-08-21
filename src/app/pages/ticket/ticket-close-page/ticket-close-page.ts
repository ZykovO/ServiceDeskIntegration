import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../interfaces/ticket.interface';
import { StorageService } from '../../../services/local-storage-service';
import { TicketService } from '../../../services/ticket-service';
import { ActivatedRoute } from '@angular/router';
import { PrepareNewRequest } from '../../../interfaces/prepare-new-request';
import {
  FormField,
  FormSelect,
  FormSelectOption,
  PrepareNewFormResponse
} from '../../../interfaces/preparenew.response.interface';
import { Skeleton } from 'primeng/skeleton';
import { InputText } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { Card } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelect } from 'primeng/multiselect';
import { MessageService, PrimeTemplate } from 'primeng/api';

import { FileUpload } from 'primeng/fileupload';
import { Toast } from 'primeng/toast';
import { Checkbox } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Observable } from 'rxjs';
import {UploadFileComponent} from '../../../components/upload-file-component/upload-file-component';

// Удаляем дублирующийся интерфейс, он уже определен в file-upload-component
// interface UploadResponse {
//   success: boolean;
//   message: string;
//   fileId?: string;
//   url?: string;
// }

@Component({
  selector: 'app-ticket-close-page',
  imports: [
    Skeleton,
    InputText,
    ReactiveFormsModule,
    Select,
    Textarea,
    FormsModule,
    Card,
    DatePicker,
    MultiSelect,
    PrimeTemplate,
    TableModule,
    UploadFileComponent,
  ],
  templateUrl: './ticket-close-page.html',
  styleUrl: './ticket-close-page.css'
})
export class TicketClosePage implements OnInit {
  ticket?: Ticket | null;
  actType?: number | null;
  private readonly TICKET_KEY = 'currentTicket';
  isLoading = true;
  formFields?: PrepareNewFormResponse | null;


  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private storage: StorageService,
    private messageService: MessageService
  ) {
    // Инициализируем функцию загрузки через сервис
  }

  ngOnInit(): void {
    console.log('Start Close ticket');
    this.isLoading = true;
    this.loadTicket();
    this.getFormFields();
    this.isLoading = false;
  }



  private loadTicket(): void {
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    const userId = Number(this.route.snapshot.paramMap.get('user_id'));
    this.actType = Number(this.route.snapshot.paramMap.get('actType'));
    this.ticket = this.getCurrentTicket();
  }

  getFormFields() {
    if (this.ticket && this.actType) {
      const prepareRequest: PrepareNewRequest = {
        contractor_id: this.ticket.FormData!.contractor_id,
        ticket_id: this.ticket.InternalId,
        client_id: this.ticket.FormData!.client_id,
        ticket_type: this.ticket.FormData!.ticket_type,
        additional_number: this.ticket.ExternalId || '',
        act_type: this.actType
      };

      this.ticketService.get_preparenew(prepareRequest).subscribe({
        next: (preparenewForm) => {
          this.formFields = preparenewForm;
        },
        error: (error) => {
          console.error('Ошибка получения формы:', error);
          this.isLoading = false;
        }
      });

      console.log(prepareRequest);
      return null;
    } else {
      this.isLoading = false;
      return null;
    }
  }

  saveTicket(ticket: Ticket): void {
    this.storage.set(this.TICKET_KEY, ticket);
  }

  getCurrentTicket(): Ticket | null {
    return this.storage.get<Ticket>(this.TICKET_KEY);
  }

  getFieldType(field: FormField): string {
    if ('field_type' in field) {
      return field.field_type;
    }
    return 'unknown';
  }

  isFormSelect(field: FormField): field is FormSelect {
    return this.getFieldType(field) === 'select';
  }


}
