import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Proyek1lampauPage } from './proyek1lampau';

@NgModule({
  declarations: [
    Proyek1lampauPage,
  ],
  imports: [
    IonicPageModule.forChild(Proyek1lampauPage),
  ],
  exports: [
    Proyek1lampauPage
  ]
})
export class Proyek1lampauPageModule {}
