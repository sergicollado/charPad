import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Player } from '../../models';
import { InputForm } from './input-form';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {
  
  @Input() player: Player;
  @Input() inputList: InputForm[] = [];
  @Input() formControls: any[] = [];
  controlsCreated = false;

  characterFormGroup = new FormGroup({});

  constructor() { }

  ngOnInit() {
    this.formControls.forEach(control => {
      this.characterFormGroup.addControl(control.name, control.formControl);
    });
    setTimeout( () => this.controlsCreated = true, 2000);
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
