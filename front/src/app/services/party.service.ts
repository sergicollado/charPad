import { Injectable } from '@angular/core';
import { Party, PartyList } from '../models/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  partyList: PartyList = new PartyList();

  currentParty: Party;

  get (partyId: string) {
    return this.partyList[partyId];
  }

  newParty(id, name, game, players) {
    const party = new Party(id, name, game, players);
    this.partyList.parties.push(party);
    this.currentParty = party;
  }

}
