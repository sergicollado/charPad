import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Party } from '../models/party';

@Injectable({
  providedIn: 'root'
})
export class PartyStorageService {

  constructor(
    private storage: Storage
  ) { }

  getPartyKey (party: Party) {
    return `party-${party.id}`; 
  }

  getParty(party:Party) {
    this.storage.get(this.getPartyKey(party));
  } 

  saveParty(party:Party) {
    this.storage.set(this.getPartyKey(party), party);
  } 

  getParties () {
    return new Promise((resolve, reject) => {
      const parties: Party[] = [];
      this.storage.forEach( (item: any, key) => {
        if (key.includes(item.id)) {
          console.log('item included', item);
          parties.push(new Party(
            item.id,
            item.name,
            item.game,
            item.players
            ));
        }
      }).then( values => resolve(parties));
    });
  }
}
