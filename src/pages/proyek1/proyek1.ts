import { Component, ViewChild } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, Navbar, Tabs } from 'ionic-angular';
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
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = Proyek1baruPage;
  tab2Root = Proyek1berjalanPage;
  tab3Root = Proyek1lampauPage;
  responseData : any;
  userDetails : any;
  plan2 : any;
  status: any;
  finish : any;
  constructor(public authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.plan2 = navParams.get('plan2');
    this.status = navParams.get('status');
    this.finish= navParams.get('finish');

 
  }
  ionViewDidEnter() {
    if(this.status == '1'){
      this.tabRef.select(1);
    }
    if(this.finish == '1'){
      this.tabRef.select(2);
    }
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProyekPage');
    if(this.plan2 == '1'){
      this.setBackButtonAction()
    }
    if(this.status == '1'){
      this.setBackButtonAction()
    }
    if(this.finish == '1'){
      this.setBackButtonAction()
    }
  }

   ionViewWillLeave() {
    console.log('ionViewWillLeave ProyekPage');
    localStorage.removeItem('order_baru')
    localStorage.removeItem('order_berjalan')
  } 

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      localStorage.removeItem('order_baru')
      localStorage.removeItem('order_berjalan')
       this.navCtrl.setRoot(MapPage)
    }
 }

}
