import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HubkamiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-hubkami',
  templateUrl: 'hubkami.html',
})
export class HubkamiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
     this.menu.swipeEnable(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HubkamiPage');
  }

}
