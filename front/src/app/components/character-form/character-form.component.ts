import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models';
import { InputForm } from './input-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {
  
  @Input() player: Player;
  @Input() inputList: InputForm[] = [];
  @Input() formGroup = new FormGroup({});;

  myGroup = new FormGroup({});

  constructor() { }

  ngOnInit() {
  }

  public getInputPosition(input: InputForm): any {
    return {
        top: `${input.top}px`,
        left: `${input.left}px`,
        height: `${input.height}px`,
        width: `${input.width}px`,
    };
}
}
