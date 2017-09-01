import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolygonPage } from './polygon';

@NgModule({
  declarations: [
    PolygonPage,
  ],
  imports: [
    IonicPageModule.forChild(PolygonPage),
  ],
  exports: [
    PolygonPage
  ]
})
export class PolygonPageModule {}
