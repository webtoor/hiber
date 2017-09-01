import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Proyek1berjalanPage } from './proyek1berjalan';

@NgModule({
  declarations: [
    Proyek1berjalanPage,
  ],
  imports: [
    IonicPageModule.forChild(Proyek1berjalanPage),
  ],
  exports: [
    Proyek1berjalanPage
  ]
})
export class Proyek1berjalanPageModule {}
