import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage} from '../map/map';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
back(){
  this.navCtrl.setRoot(MapPage);
}
}
