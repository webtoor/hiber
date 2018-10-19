import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatussortPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-statussort',
  templateUrl: 'statussort.html',
})
export class StatussortPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatussortPage');
  }

  rating() {
    this.viewCtrl.dismiss({
      kode : 'rating'
    });
  }
  termurah() {
    this.viewCtrl.dismiss({
      kode : 'termurah'
    });
  }
  termahal() {
    this.viewCtrl.dismiss({
      kode : 'termahal'
    });
  }
}
