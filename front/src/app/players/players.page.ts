import { Component, OnInit } from '@angular/core';
import { CharacterSheetComponent } from './../character-sheet/character-sheet.component';
import { Player } from '../models';




@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  lastId = 0;
  currentPlayer = 1;
  players: Player[] = [];

  constructor() { }

  ngOnInit() {
    this.addPlayer();
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
}
