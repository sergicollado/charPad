import { Player } from './player';

export class Party {
    constructor(
        public id: string,
        public players: Array<Player>) {
    }
}

export interface PartyList {
    [name: string]: Party;
}
