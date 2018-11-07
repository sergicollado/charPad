import { Component, OnInit } from '@angular/core';
import { Player } from '../models';
import { PartyService } from '../services/party.service';
import { Games } from '../models/games';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputList } from '../models/inputList';




@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage {
  zoom = 1;
  lastId = 0;
  currentPlayer = 1;
  players: Player[] = [];
  inputs: InputList = new InputList();
  formGroupsMap: any = {};  
  formGroup: FormGroup = new FormGroup({});
  defaultValue = {};

  formControls = [];
  showForm = false;

  constructor(private partyService: PartyService, private _fb: FormBuilder) {
    partyService.newParty('id', Games.FAE, this.players);
   }

  getNewPlayerId() {
    this.lastId ++;
    return this.lastId;
  }

  addPlayer() {
    const id = this.getNewPlayerId();
    this.formGroupsMap[id] = new FormGroup({});
    const player = new Player(id, `player ${this.players.length + 1}`);
    player.values = JSON.parse(JSON.stringify(this.defaultValue));
    this.players.push(player);
    console.log(this.players);
  }

  isCurrentPlayer(playerId: string) {
    return playerId == <string><any>this.currentPlayer;
  }
  changePlayer($event) {
    console.log($event.detail.value);
    this.currentPlayer = $event.detail.value;
    this.formGroup.patchValue(this.getCurrentPlayer().values);
    console.log($event);
  }

  getCurrentPlayer() {
    return this.players.find( player => player.id == this.currentPlayer);
  }

  initForm(){
    this.formControls.forEach(control => {
      this.formGroup.addControl(control.name, control.formControl);
    });
    this.defaultValue = JSON.parse(JSON.stringify(this.formGroup.value));;
    console.log(this.defaultValue);
    this.addPlayer();
  }

  onPDFLoaded($event) {
    console.log('onLOAD', $event);
    this.inputs = $event.inputs;
    this.formControls = $event.formControls;
    this.initForm();
    this.formGroup.valueChanges.subscribe(values => {
      const player = this.getCurrentPlayer();
      if(player){
        player.values = values;
        console.log('current player', player.values);
      }
    });
    this.showForm = true;
  }

  zoomIn() {
    this.inputs.zoomIn();
  }
  zoomOut() {
    this.inputs.zoomOut();
  }
}
