import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, NavParams, LoadingController, ToastController, Events  } from 'ionic-angular';
import { DaftarPage } from '../daftar/daftar'
import { MapPage } from '../map/map'

import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { FCM } from '@ionic-native/fcm';

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
  userHiber = { "email": "", "password": "", "device_token" : "" };
  constructor(public alertCtrl : AlertController, public fcm: FCM, public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public menu: MenuController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public events: Events) {
    this.menu.swipeEnable(false);

  }


  ionViewDidEnter() {
    this.pushSetup();
  }
/*   ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  } */

  pushSetup(){
    this.fcm.getToken().then(token => {

      this.userHiber.device_token = token;
    });
  }
  login() {

    if (this.userHiber.email && this.userHiber.password && this.userHiber.device_token) {
      this.authService.postData(this.userHiber, "login_user", "").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData["access_token"]) {
          this.showLoader();
          this.events.publish('email', this.responseData.email);

          localStorage.setItem('userHiber', JSON.stringify(this.responseData));
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
