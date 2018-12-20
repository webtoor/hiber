import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the HistoryProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-history-project',
  templateUrl: 'history-project.html',
})
export class HistoryProjectPage {
  provider_id;
  public userDetails: any;
  public responseData: any;
  items:any;
  loading:any;
  constructor(public app: App, public loadingCtrl: LoadingController, public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  this.provider_id = navParams.get('provider_id');
  console.log(this.provider_id)
  const data = JSON.parse(localStorage.getItem('userHiber'));
  this.userDetails = data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryProjectPage');
    this.getHistory();
  }

  backToWelcome() {
    let nav = this.app.getRootNav();
    nav.setRoot(WelcomePage);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Loading..',
    });

    this.loading.present();
  }
  getHistory(){
    this.showLoader();
    this.authService.getData('api/user/history_provider/' + this.provider_id, this.userDetails['access_token']).then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData['success'] == true) {
        this.items = this.responseData['data'];
        this.loading.dismiss()
      } else {
        this.loading.dismiss()
        localStorage.clear();
        setTimeout(() => this.backToWelcome(), 1000);
      }
    }, (err) => {
      this.loading.dismiss()
    });
  }

}
