import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoCompletePage } from './auto-complete';

@NgModule({
  declarations: [
    AutoCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(AutoCompletePage),
  ],
  exports: [
    AutoCompletePage
  ]
})
export class AutoCompletePageModule {}
