import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Proyek1baruPage } from './proyek1baru';

@NgModule({
  declarations: [
    Proyek1baruPage,
  ],
  imports: [
    IonicPageModule.forChild(Proyek1baruPage),
  ],
  exports: [
    Proyek1baruPage
  ]
})
export class Proyek1baruPageModule {}
