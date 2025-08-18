import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Ticket} from '../interfaces/ticket.interface';
import {PrepareNewRequest} from '../interfaces/prepare-new-request';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  get_ticket(ticket_id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_URL}/tickets/${ticket_id}`);
  }

  get_preparenew(requestData: PrepareNewRequest) {
    return this.http.post(`${this.API_URL}/tickets/preparenew`, {
      contractor_id:requestData.contractor_id,
      ticket_id:requestData.contractor_id,
      client_id:requestData.contractor_id,
      ticket_type:requestData.contractor_id,
      act_type:requestData.contractor_id,
    });
  }
}
