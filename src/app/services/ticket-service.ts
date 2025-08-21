import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Ticket} from '../interfaces/ticket.interface';
import {PrepareNewRequest} from '../interfaces/prepare-new-request';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  PrepareNewFormResponse,
  TicketAttachments
} from '../interfaces/preparenew.response.interface';
import {MenuTokenSections} from '@primeuix/themes/types/menu';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get_ticket(ticket_id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_URL}/tickets/${ticket_id}`);
  }

  get_preparenew(requestData: PrepareNewRequest): Observable<PrepareNewFormResponse> {
    return this.http.post<PrepareNewFormResponse>(`${this.API_URL}/tickets/preparenew`, {
      contractor_id: requestData.contractor_id,
      ticket_id: requestData.ticket_id,
      client_id: requestData.client_id,
      ticket_type: requestData.ticket_type,
      act_type: requestData.act_type,
    });
  }


  getTicketAttachments(ticket_id: number): Observable<TicketAttachments> {
    return this.http.get<TicketAttachments>(
      `${this.API_URL}/tickets/preparenew/files`,
      {params: {'id': ticket_id.toString()}}
    );
  }

  deleteTicketAttachment(filename: string): Observable<TicketAttachments> {
    return this.http.get<TicketAttachments>(
      `${this.API_URL}/tickets/preparenew/delete_file`,
      {params: {'id': filename}}
    );
  }

  uploadTicketAttachments(ticketId: number, formData: FormData, session: string) {
    return this.http.post(`${this.API_URL}/tickets/preparenew/files/`, formData);
  }
}
