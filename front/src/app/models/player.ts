import { FormGroup } from "@angular/forms";

export interface CharacterSheet {
    id: number;
    name: string;
    values: any;
}

export class Player implements CharacterSheet {
    constructor(public id: number, public name: string) {}
    values: any;
}