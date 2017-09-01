import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HubkamiPage } from './hubkami';

@NgModule({
  declarations: [
    HubkamiPage,
  ],
  imports: [
    IonicPageModule.forChild(HubkamiPage),
  ],
  exports: [
    HubkamiPage
  ]
})
export class HubkamiPageModule {}
