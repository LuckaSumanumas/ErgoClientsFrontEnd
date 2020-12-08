import { Client } from './client';

export interface ClientResponse {
  status: String,
  type: String,
  entities: Array<Client>
}
