import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'


/**
 * Generated class for the PenggunaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pengguna',
  templateUrl: 'pengguna.html',
})
export class PenggunaPage {
  public userDetails : any;
  public responseData: any;
  public dataSet : any;
  userPostData = {"user_id":"", "token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public menu: MenuController, public authService : AuthServiceProvider) {
     this.menu.swipeEnable(false);
     const data = JSON.parse(localStorage.getItem('userData'));
     this.responseData = data.userData;
     console.log(this.responseData);
     this.userDetails = data.userData;
     this.userPostData.user_id = this.userDetails.user_id;
     this.userPostData.token = this.userDetails.token;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenggunaPage');
  }
  /*getFeed(){
   this.authService.postData(this.userPostData, "feed").then((result) =>{
    this.responseData = result;
    if(this.responseData.feedData){
    this.dataSet = this.responseData.feedData;
    console.log(this.dataSet);
  }
  else{
    console.log("No access");
  }


    }, (err) => {
      //Connection failed message
    });
  }*/


  backToWelcome(){
   this.navCtrl.setRoot(WelcomePage);
  }
  logout(){
    //Api Token Logout
    localStorage.clear();
     setTimeout(()=> this.backToWelcome(), 1000);
  }
}
