import { Component } from '@angular/core';
import { App, MenuController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { WelcomePage } from '../welcome/welcome'
import { ProfilproviderPage } from '../profilprovider/profilprovider'
/**
 * Generated class for the Proyek1lampauPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-proyek1lampau',
  templateUrl: 'proyek1lampau.html',
})
export class Proyek1lampauPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  constructor(public authService:AuthServiceProvider, public app: App, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
     this.menu.swipeEnable(false);
     const data = JSON.parse(localStorage.getItem('userHiber'));
     this.userDetails = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1lampauPage');
    this.getHistory();
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

  getHistory(){
    this.showLoader()
    this.authService.getData('api/user/order_history/' + this.userDetails['id'], this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['order'];
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
    provider_id(id_provider:any){
      console.log(id_provider)
      let nav = this.app.getRootNav();
      nav.push(ProfilproviderPage, {
      id : id_provider,
    });
    }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.getHistory();
      refresher.complete();

     /*  setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000); */
    }
}
