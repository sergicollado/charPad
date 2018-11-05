import { FormGroup } from "@angular/forms";

export interface CharacterSheet {
    id: number;
    name: string;
    character: any;
}

export class Player implements CharacterSheet {
    constructor(public id: number, public name: string) {}
    character: any;
    formGroup: FormGroup;
}