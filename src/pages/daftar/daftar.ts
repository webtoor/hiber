import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { LoginPage } from '../login/login'
import { WelcomePage } from '../welcome/welcome'

/**
 * Generated class for the DaftarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-daftar',
  templateUrl: 'daftar.html',
})
export class DaftarPage {
  responseData:any;
  loading: any;
  pesan:any;

  //userData = {"username":"munshi", "email":"munshi@email.com","password":"rahasia", 	"password_confirmation" : "rahasia", "registerType": "2"};
  userData = {	
  "username" : "toor",
	"email" : "toosr@email.com",
	"password" : "rahasia",
	"password_confirmation" : "rahasia",
	"firstname" : "toor",
	"lastname" : "toor",
	"registerType": "2"}
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public menu: MenuController) {
  this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DaftarPage');
  }
  daftar() {
      console.log(this.userData)
       if(this.userData.username  && this.userData.email && this.userData.password){
     this.authService.postData(this.userData, "register").then((result) => {
       this.responseData = result;
       console.log(this.responseData);
       if(this.responseData.userData){
         this.showLoader();
      //localStorage.setItem('userData', JSON.stringify(this.responseData) );
      this.loading.dismiss();
      //this.navCtrl.pop();
      this.navCtrl.push(WelcomePage, {
        day: 1
      }); }
      else{
        this.pesan = result["text"];
        this.presentToast(this.pesan);
      }
     }, (err) => {
       this.showLoader();
       this.loading.dismiss();
       this.presentToast("Tidak terhubung ke server");
     });
   }
 else {
  this.presentToast("Harus di isi semua");
 }


 }

   showLoader(){
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
login(){
  this.navCtrl.push(LoginPage);
}
 }
