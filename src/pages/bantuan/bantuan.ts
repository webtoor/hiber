import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { MapPage} from '../map/map';

/**
 * Generated class for the BantuanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-bantuan',
  templateUrl: 'bantuan.html',
})
export class BantuanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
     this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BantuanPage');
  }

  tutorial(){
    localStorage.removeItem('Intro');
    this.navCtrl.setRoot(MapPage);
  }

}
