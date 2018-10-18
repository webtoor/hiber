import { Component } from '@angular/core';
import { App, MenuController, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map'


/**
 * Generated class for the RatingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  User = {"rating" : ""}
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public app: App) {
     this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }
  rate(){
    console.log(this.User);
    let nav = this.app.getRootNav();
    nav.setRoot(MapPage);
  }
}
