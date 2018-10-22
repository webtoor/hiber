import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { WelcomePage } from '../welcome/welcome'

/**
 * Generated class for the ProfilproviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profilprovider',
  templateUrl: 'profilprovider.html',
})
export class ProfilproviderPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  id : any
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider, public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.id = navParams.get('id');
    const data = JSON.parse(localStorage.getItem('userHiber'));
    this.userDetails = data;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilproviderPage');
    this.getProfilProvider();
  }

  backToWelcome(){
    let nav = this.app.getRootNav();
    nav.setRoot(WelcomePage);
   }

  getProfilProvider(){
    this.authService.getData('api/user/profil_provider/' + this.id, this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['order'];
      }else{
        localStorage.clear();
        setTimeout(()=> this.backToWelcome(), 1000);  
      }
    }, (err) => {
    });
  }

}
