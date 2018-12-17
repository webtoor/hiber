import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HubungiProviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-hubungi-provider',
  templateUrl: 'hubungi-provider.html',
})
export class HubungiProviderPage {
  username;
  email;
  phone;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username= navParams.get('username');
    this.email = navParams.get('email');
    this.phone = navParams.get('phone');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HubungiProviderPage');
  }

}
