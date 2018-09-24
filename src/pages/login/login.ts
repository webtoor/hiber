import { Component } from '@angular/core';
import { MenuController,NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { DaftarPage } from '../daftar/daftar'
import { MapPage } from '../map/map'
import { PenggunaPage } from '../pengguna/pengguna'

import { AuthServiceProvider } from '../../providers/auth-service/auth-service'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  loading: any;
  userData = { "email": "", "password": "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public menu: MenuController, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {

    if (this.userData.email && this.userData.password) {
      this.authService.postData(this.userData, "login", "").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData["access_token"]) {
          this.showLoader();
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          this.loading.dismiss();
          this.navCtrl.setRoot(MapPage);
        }
        else{
         this.presentToast('Invalid credentials' + "\n" +  this.responseData['message']);
        }
      }, (err) => {
        this.showLoader();
        this.loading.dismiss();
        this.presentToast("Tidak terhubung ke server");
      });
    }
    else {
      this.presentToast("The email field is required \n The password field is required");
    }
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authentication...',
      duration: 3000,
    });

    this.loading.present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  daftar() {
    this.navCtrl.push(DaftarPage);
  }
}
