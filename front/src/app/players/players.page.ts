import { Component, OnInit } from '@angular/core';
import { Player } from '../models';
import { PartyService } from '../services/party.service';
import { Party } from '../models/party';
import { Games } from '../models/games';
import { InputForm } from '../components/character-form/input-form';
import { FormGroup, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage {

  lastId = 0;
  currentPlayer = 1;
  players: Player[] = [];
  inputs: InputForm[] = []
  formGroup: FormGroup;

  constructor(private partyService: PartyService, private _fb: FormBuilder) {
    this.formGroup = this._fb.group({});
    this.addPlayer();
    partyService.newParty('id', Games.FAE, this.players);
   }

  getNewPlayerId() {
    this.lastId ++;
    return this.lastId;
  }

  addPlayer() {
    this.players.push(new Player(this.getNewPlayerId(), `player ${this.players.length + 1}`));
    console.log(this.players);
  }

  isCurrentPlayer(playerId: string) {
    return playerId == <string><any>this.currentPlayer;
  }
  changePlayer($event) {
    console.log($event.detail.value);
    this.currentPlayer = $event.detail.value;
    console.log($event);
  }

  onPDFLoaded($event) {
    console.log('onLOAD', $event);
    this.formGroup = $event.formGroup;
    this.players.forEach(player => {
      this.inputs = $event.inputs;
    })
  }
}
