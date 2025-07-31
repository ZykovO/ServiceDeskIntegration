import { Action } from './action.interface';
import { Comment } from './comment.interface';
import {ActionsButtonsModel} from './actions_buttons.interface';
import {TicketFormDataModel} from './ticket_form_data.interface';

export interface Ticket {
  InternalId: number;
  ExternalId?: string | null;
  Type?: string | null;
  Text?: string | null;
  Shop?: string | null;
  Contractor?: string | null;
  ShopCity?: string | null;
  Address?: string | null;
  Region?: string | null;
  DateCreate?: string | null;
  DateApprove?: string | null;
  DateClose?: string | null;
  Deadline?: string | null;
  PerformerId?: number | null;
  PerformerName?: string | null;
  UserId?: number | null;
  Customer?: string | null;
  Status?: boolean | null;
  CompletedWork?: string | null;
  ACtStatus?: string | null;

  Actions: Action[];
  Comentaries: Comment[];
  Attachments: string[];

  ActionsButtons: ActionsButtonsModel;
  FormData?: TicketFormDataModel | null;
}
