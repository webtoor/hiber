import { Component, ViewChild } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Proyek1baruPage } from '../proyek1baru/proyek1baru';
import { Proyek1berjalanPage} from '../proyek1berjalan/proyek1berjalan';
import { Proyek1lampauPage } from '../proyek1lampau/proyek1lampau';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { MapPage } from '../map/map';




@Component({
  selector: 'page-proyek1',
  templateUrl: 'proyek1.html',
})
export class Proyek1Page {
  @ViewChild(Navbar) navBar: Navbar;

  tab1Root = Proyek1baruPage;
  tab2Root = Proyek1berjalanPage;
  tab3Root = Proyek1lampauPage;
  responseData : any;
  userDetails : any;
  plan2 : any;
  constructor(public authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.plan2 = navParams.get('plan2');
  /*   const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data; */
    //this.getProject();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProyekPage');
    if(this.plan2 == '1'){
      this.setBackButtonAction()
    }
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      localStorage.removeItem('order_status')
       this.navCtrl.setRoot(MapPage)
    }
 }
/*   getProject(){
      this.authService.getData('api/user/order_status/' + this.userDetails['id'], this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData['order']);
      }) 
  } */

}
