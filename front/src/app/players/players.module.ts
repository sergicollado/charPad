import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayersPage } from './players.page';

import { CharacterSheetComponent } from '../character-sheet/character-sheet.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


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
  declarations: [PlayersPage, CharacterSheetComponent]
})
export class PlayersPageModule {}
