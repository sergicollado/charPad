import { Player } from './player';
import { Games } from './games';

export class Party {
    currentPlayer: Player;
    constructor(
        public id: string,
        public game: Games,
        public players: Array<Player>) {
            this.currentPlayer = players[0];
    }
    
    isCurrentPlayer(playerId: string) {
        return playerId == <string><any>this.currentPlayer;
    }
}

export class PartyList {
    parties: Party[] = [];
}
