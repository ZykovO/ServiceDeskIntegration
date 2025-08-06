export interface PrepareNewRequest {
  contractor_id: number;
  equipment_repair?: string;
  problem_description?: string;
  incoming_ttn?: string;
  text?: string;
  ticket_id: number;
  client_id: number;
  ticket_type: number;
  additional_number?: string;
  act_type: number;
}
