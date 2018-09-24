import { Component, ElementRef, ViewChild, } from '@angular/core';
import { App, MenuController, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { PolygonPage } from '../polygon/polygon'


/**
 * Generated class for the Proyek1baruPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-proyek1baru',
  templateUrl: 'proyek1baru.html',
})
export class Proyek1baruPage {
  //public firstname: string = 'John';
  @ViewChild('id_order') input:any;
  proyekData : any
  public userDetails : any;
  public responseData: any;
  public dataSet : any;
  userPostData = {"username":"", "token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public authService:AuthServiceProvider, public app: App) {
     this.menu.swipeEnable(false);
     const data = JSON.parse(localStorage.getItem('userData'));
     this.userDetails = data.userData;
     this.userPostData.username = this.userDetails.username;
     this.userPostData.token = this.userDetails.token;
     console.log(this.userPostData)
     this.getproyek();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1baruPage');
  }
  getproyek(){
    this.authService.postData(this.userPostData , 'proyekbaru', '').then((result)=>{
    this.responseData = result;
    if(this.responseData.proyekBaru){
    this.dataSet = this.responseData.proyekBaru;
    console.log(this.dataSet);
  }
  else{
    console.log("No access");
  }
    }
  )
}
polygon(id_order:any){
  //this.proyekData =  (document.getElementById('idorder') as HTMLInputElement).value;
   //console.log(id)
    let nav = this.app.getRootNav();
    nav.push(PolygonPage, {
     id_order : id_order,
   });
   /*let nav = this.app.getRootNav();
   nav.push(PolygonPage);*/
}
}
