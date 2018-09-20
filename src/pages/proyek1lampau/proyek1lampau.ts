import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Proyek1lampauPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-proyek1lampau',
  templateUrl: 'proyek1lampau.html',
})
export class Proyek1lampauPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
     this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1lampauPage');
  }

}
