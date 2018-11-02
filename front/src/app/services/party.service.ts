import { Injectable } from '@angular/core';
import { Party, PartyList } from '../models/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  partyList: PartyList = {};

  get (partyId: string) {
    return this.partyList[partyId];
  }
}
