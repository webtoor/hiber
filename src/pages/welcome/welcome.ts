import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DaftarPage } from '../daftar/daftar'
import { LoginPage } from '../login/login'
import { MapPage } from '../map/map';


/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
     this.menu.swipeEnable(false);
     if(localStorage.getItem('userData')){
       this.navCtrl.setRoot(MapPage);
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

daftar(){
  this.navCtrl.push(DaftarPage);
}
login(){
  this.navCtrl.push(LoginPage);
}
}
