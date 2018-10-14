import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, ToastController  } from 'ionic-angular';
import { DaftarPage } from '../daftar/daftar'
import { LoginPage } from '../login/login'
import { MapPage } from '../map/map';


/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public toastCtrl: ToastController) {
     this.menu.swipeEnable(false);

    var day = navParams.get('day');
    //console.log(day)
    if(day == 1){
      this.presentToast()
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WelcomePage');
  }

daftar(){
  this.navCtrl.push(DaftarPage);
}
login(){
  this.navCtrl.push(LoginPage);
}
presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Berhasil Mendaftar, Silahkan login',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
