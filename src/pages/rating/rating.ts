import { Component } from '@angular/core';
import { App, MenuController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Proyek1Page } from '../proyek1/proyek1'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { WelcomePage } from '../welcome/welcome'


/**
 * Generated class for the RatingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  User = {
    "writter" : "",
    "for" : "",
    "rating" : "",
    "comment" : "",
  };
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  order_id:any;
  constructor(public authService:AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public app: App, public loadingCtrl: LoadingController) {
     this.menu.swipeEnable(false);
     this.order_id = navParams.get('order_ids');
     const user = JSON.parse(localStorage.getItem('userHiber'));
     this.userDetails = user;
     this.getRating();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  
  }
  rate(){
    this.User.writter = this.userDetails['id'];
    console.log(this.User);
  /*   let nav = this.app.getRootNav();
    nav.push(Proyek1Page, {
      finish : 1
    }); */
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
  getRating(){
    this.showLoader()
    this.authService.getData('api/user/get_rating/' + this.order_id, this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      //console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['data'];
        this.User.for = this.items[0]['proposal_by']
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
