import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proyek1baruPage } from '../proyek1baru/proyek1baru';
import { Proyek1berjalanPage} from '../proyek1berjalan/proyek1berjalan';
import { Proyek1lampauPage } from '../proyek1lampau/proyek1lampau';



@Component({
  selector: 'page-proyek',
  templateUrl: 'proyek1.html',
})
export class Proyek1Page {

  tab1Root = Proyek1baruPage;
  tab2Root = Proyek1berjalanPage;
  tab3Root = Proyek1lampauPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProyekPage');
  }

}
