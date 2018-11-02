export interface CharacterSheet {
    id: number;
    name: string;
    character: any;
}

export class CharacterSheetData {
    description = '';
    refresh = 3;
    fatePoints = 3;
    aspects: Array<string> = ['', '', '', '', ''];
    approaches = {
        careful: 0,
        sneaky: 0,
        clever: 0,
        flashy: 0,
        quick: 0,
        forceful: 0
    };
    stunts = '';
    stress: Array<boolean> = [false, false, false];
    consequences: any =  {
        mild: '',
        moderate: '',
        severe: ''
    };
}

export class Player implements CharacterSheet {
    constructor(public id: number, public name: string) {}
    character: CharacterSheetData = new CharacterSheetData();
}