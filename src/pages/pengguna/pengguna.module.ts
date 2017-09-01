import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenggunaPage } from './pengguna';

@NgModule({
  declarations: [
    PenggunaPage,
  ],
  imports: [
    IonicPageModule.forChild(PenggunaPage),
  ],
  exports: [
    PenggunaPage
  ]
})
export class PenggunaPageModule {}
