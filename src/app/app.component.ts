import { Component, ViewChild} from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapPage } from '../pages/map/map';
import { WelcomePage } from '../pages/welcome/welcome';
import { Proyek1Page } from '../pages/proyek1/proyek1';
import { PenggunaPage } from '../pages/pengguna/pengguna';
import { HubkamiPage } from '../pages/hubkami/hubkami';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { PolygonPage } from '../pages/polygon/polygon';



@Component({
  templateUrl: 'app.html'
})
export class Hiber {
  @ViewChild(Nav) nav: Nav;
  userDetails : any;
  emails :any;
  rootPage: any =  WelcomePage;

  pages: Array<{title: string, icon: string,  component: any}>;


  constructor(public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.userDetails = JSON.parse(localStorage.getItem('userData'));
    if(this.userDetails){
    this.emails = this.userDetails.email;
    }
    events.subscribe('email', (email) => {
      this.emails = email;
      console.log(email);
    });
    console.log(this.userDetails)
    // ngfor navigation push
   this.pages = [
     { title: 'Pengguna', icon: 'contact', component: PenggunaPage },
     { title: 'Proyek', icon: 'book', component: Proyek1Page },
     { title: 'Hubungi kami', icon: 'mail', component: HubkamiPage },
     { title: 'Bantuan', icon: 'help-circle', component: BantuanPage }
    ];

  }

    initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        setTimeout(() => {
          this.splashScreen.hide();
          }, 100);
          this.statusBar.backgroundColorByHexString('#2A2C43');
          this.statusBar.styleBlackTranslucent()
        this.splashScreen.hide();
      });
    }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

}
