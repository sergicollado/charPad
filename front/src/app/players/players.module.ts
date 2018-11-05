import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayersPage } from './players.page';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CharacterSheetComponent } from '../components/character-sheet/character-sheet.component';
import { CharacterFormComponent } from '../components/character-form/character-form.component';


const routes: Routes = [
  {
    path: '',
    component: PlayersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PdfViewerModule
  ],
  declarations: [PlayersPage, CharacterSheetComponent, CharacterFormComponent]
})
export class PlayersPageModule {}
