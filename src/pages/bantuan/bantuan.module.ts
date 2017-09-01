import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BantuanPage } from './bantuan';

@NgModule({
  declarations: [
    BantuanPage,
  ],
  imports: [
    IonicPageModule.forChild(BantuanPage),
  ],
  exports: [
    BantuanPage
  ]
})
export class BantuanPageModule {}
