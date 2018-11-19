import { Injectable, OnInit } from '@angular/core';
import { Party, PartyList } from '../models/party';
import { PartyStorageService } from './party-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  partyList: PartyList = new PartyList();

  currentParty: Party;
  constructor(private storage: PartyStorageService) {
    this.storage.getParties().then(parties => {
      console.log(parties);
      this.partyList.parties = <Party[]>parties;
    }).catch(err => console.log(err));
  }

  get (partyId: string) {
    return this.partyList[partyId];
  }

  newParty(id, name, game, players) {
    const party = new Party(id, name, game, players);
    this.partyList.parties.push(party);
    this.currentParty = party;
  }

}
