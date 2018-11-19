import { Component, OnInit } from '@angular/core';
import { Player } from '../models';
import { PartyService } from '../services/party.service';
import { Games } from '../models/games';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputList } from '../models/inputList';
import { Party } from '../models/party';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RouterInitializer } from '@angular/router/src/router_module';
import { Storage } from '@ionic/storage';
import { PartyStorageService } from '../services/party-storage.service';




@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage  implements OnInit{
  zoom = 1;
  lastId = 0;
  currentPlayer: Player;
  players: Player[] = [];
  inputs: InputList = new InputList();
  formGroupsMap: any = {};
  formGroup: FormGroup = new FormGroup({});
  defaultValue = {};
  party: Party;
  games = Games;
  loading;
  formControls = [];
  showForm = false;

  constructor(private partyService: PartyService,
    public loadingController: LoadingController,
    private router: Router,
    private storage: PartyStorageService) {
    }
    
    ngOnInit() {
      if ( !this.partyService.currentParty ) {
        this.router.navigate(['home']);
      }
      this.presentLoading();
      this.party = this.partyService.currentParty;
      this.players = this.party.players;
      if ( this.players.length > 0) {
        this.lastId = this.players[this.players.length - 1].id;
        this.currentPlayer = this.players[0];
      }

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando ficha',
    });
    await this.loading.present();
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
    this.party.players = this.players;
    console.log(this.players);
  }

  isCurrentPlayer(playerId) {
    return playerId === this.currentPlayer.id;
  }
  changePlayer($event) {
    console.log($event.detail.value);
    this.currentPlayer = $event.detail.value;
    this.formGroup.patchValue(this.currentPlayer.values);
    console.log($event);
  }

  initForm() {
    this.formControls.forEach(control => {
      this.formGroup.addControl(control.name, control.formControl);
    });
    this.defaultValue = JSON.parse(JSON.stringify(this.formGroup.value));
    console.log(this.defaultValue);
    if ( this.players.length === 0) {
      this.addPlayer();
    }
    this.currentPlayer = this.players[0];
  }

  onPDFLoaded($event) {
    console.log('onLOAD', $event);
    this.inputs = $event.inputs;
    this.formControls = $event.formControls;
    this.initForm();
    this.formGroup.valueChanges.subscribe(values => {
      const player = this.currentPlayer;
      if (player) {
        this.currentPlayer.values = values;

        console.log('current player', player.values);
      }
    });
    this.showForm = true;
    setTimeout(() => {
      this.changePlayer({ detail: {value:  this.currentPlayer }});
      this.loading.dismiss();
    }, 3000);
  }

  zoomIn() {
    this.inputs.zoomIn();
  }
  zoomOut() {
    this.inputs.zoomOut();
  }
  save() {
    this.storage.saveParty(this.party);
  }
}
