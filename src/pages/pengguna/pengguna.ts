import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, App } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'


/**
 * Generated class for the PenggunaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-pengguna',
  templateUrl: 'pengguna.html',
})
export class PenggunaPage {
  public userDetails : any;
  public responseData: any;
  public dataSet : any;
  acces_token : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public menu: MenuController, public authService : AuthServiceProvider) {
     this.menu.swipeEnable(false);
     const data = JSON.parse(localStorage.getItem('userHiber'));
     this.userDetails = data;
    //console.log(this.userDetails['access_token'])

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
    this.authService.getData("api/logout", this.userDetails['access_token']).then((result) =>{
      this.responseData = result;
      console.log(this.responseData)
      if(this.responseData['success'] == true){
        localStorage.clear();
    }
    else{
      console.log("No access");
    }  
      }, (err) => {
        //Connection failed message
      });
    localStorage.clear();
/*  localStorage.removeItem('userHiber');
    localStorage.removeItem('Welcome');
    localStorage.removeItem('Intro'); */

     setTimeout(()=> this.backToWelcome(), 1000);
  }
}
