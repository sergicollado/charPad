import { Component } from '@angular/core';
import { Games } from '../models/games';
import { PartyService } from '../services/party.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  model = this.getInitModel();
  games = Object.keys(Games);

  getInitModel () {
    return {
      name: '',
      game: ''
    };
  } 
  
  constructor(public parties: PartyService, private router: Router) {
  }

  createGame() {
    console.log('creating game');
    this.parties.newParty(this.model.name.split(' ').join('_'), this.model.name, Games[this.model.game], []);
    this.model = this.getInitModel();
    this.router.navigate(['players']);
  }

  goToParty(party) {
    console.log('setPARTY', party);
    this.parties.currentParty = party;
    this.router.navigate(['players']);
  }

}
