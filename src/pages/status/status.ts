import { Component } from '@angular/core';
import { App, MenuController, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { WelcomePage } from '../welcome/welcome'
/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  subject : any;
  proyekData : any
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any;
  order_id:any;
  constructor(public menu: MenuController,public loadingCtrl: LoadingController, public authService:AuthServiceProvider, public app: App, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.subject= navParams.get('subject');
    this.order_id = navParams.get('order_id');

    this.menu.swipeEnable(false);
    const data = JSON.parse(localStorage.getItem('userHiber'));
    this.userDetails = data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
    this.getProposal();
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Loading..',
    });

    this.loading.present();
  }

  backToWelcome(){
    let nav = this.app.getRootNav();
    nav.setRoot(WelcomePage);
   }

  getProposal(){
    this.showLoader()
    this.authService.getData('api/user/order_proposal/' + this.order_id, this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        //localStorage.setItem('order_show', JSON.stringify(this.responseData['order']));
        this.items = this.responseData['data'];
        this.loading.dismiss()
      }else{
        this.loading.dismiss()
        localStorage.clear();
        setTimeout(()=> this.backToWelcome(), 1000);  
      }
    }, (err) => {
      this.loading.dismiss()
    });
}
}
