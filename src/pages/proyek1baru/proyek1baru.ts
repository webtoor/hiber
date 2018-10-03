import { Component, ElementRef, ViewChild, } from '@angular/core';
import { App, MenuController, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { PolygonPage } from '../polygon/polygon'
import { StatusPage } from '../status/status'



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
  proyekData : any
  public userDetails : any;
  public responseData: any;
  public items : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public authService:AuthServiceProvider, public app: App) {
    this.menu.swipeEnable(false);
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data;
    this.getProject();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1baruPage');
  }

  getProject(){
    this.authService.getData('api/user/order_status/' + this.userDetails['id'], this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      //console.log(this.responseData['order']);
      localStorage.setItem('order_status', JSON.stringify(this.responseData['order']));
      this.items = this.responseData['order'];
     /*  for (let index = 0; index < order.length; ++index) {
        if(this.responseData['order']['order_status']){
          this.dataSet = (order[index]['status_id']);

        }
    } */
      
    }, (err) => {
      console.log(err)
    });
}
      polygon(order_id:any){
          //console.log(order_id)

          let nav = this.app.getRootNav();
          nav.push(PolygonPage, {
          order_id : order_id,
        });
      }

    status(order_id:any, subject:any){
      //console.log(order_id)
      //console.log(subject)
      let nav = this.app.getRootNav();
      nav.push(StatusPage, {
      order_id : order_id,
      subject : subject
    });
    }
}
