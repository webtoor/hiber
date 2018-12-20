import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Hiber } from './app.component';
import { DaftarPage } from '../pages/daftar/daftar';
import { LoginPage } from '../pages/login/login'
import { MapPage } from '../pages/map/map';
import { Plan2Page} from '../pages/plan2/plan2';
import { Proyek1Page } from '../pages/proyek1/proyek1';
import { Proyek1baruPage } from '../pages/proyek1baru/proyek1baru';
import { Proyek1berjalanPage} from '../pages/proyek1berjalan/proyek1berjalan';
import { Proyek1lampauPage } from '../pages/proyek1lampau/proyek1lampau';
import { PenggunaPage } from '../pages/pengguna/pengguna';
import { HubkamiPage } from '../pages/hubkami/hubkami';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { RatingPage } from '../pages/rating/rating';
import { WelcomePage } from '../pages/welcome/welcome'
import { PolygonPage } from '../pages/polygon/polygon';
import { AutoCompletePage  } from '../pages/auto-complete/auto-complete';
import { SearchPage  } from '../pages/search/search';
import { StatusPage  } from '../pages/status/status';
import { StatussortPage } from '../pages/statussort/statussort';
import { ProfilproviderPage } from '../pages/profilprovider/profilprovider';
import { HubungiProviderPage } from '../pages/hubungi-provider/hubungi-provider';
import { HistoryProjectPage } from '../pages/history-project/history-project';


import { Keyboard } from "@ionic-native/keyboard"
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Ionic2RatingModule } from 'ionic2-rating';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from "@angular/http";


@NgModule({
  declarations: [
    Hiber,
    MapPage,
    DaftarPage,
    Plan2Page,
    Proyek1Page,
    Proyek1baruPage,
    Proyek1berjalanPage,
    Proyek1lampauPage,
    PenggunaPage,
    HubkamiPage,
    BantuanPage,
    RatingPage,
    WelcomePage,
    LoginPage,
    PolygonPage,
    AutoCompletePage,
    SearchPage,
    StatusPage,
    StatussortPage,
    ProfilproviderPage,
    HubungiProviderPage,
    HistoryProjectPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(Hiber,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Hiber,
    MapPage,
    DaftarPage,
    Plan2Page,
    Proyek1Page,
    Proyek1baruPage,
    Proyek1berjalanPage,
    Proyek1lampauPage,
    PenggunaPage,
    HubkamiPage,
    BantuanPage,
    RatingPage,
    WelcomePage,
    LoginPage,
    PolygonPage,
    AutoCompletePage,
    SearchPage,
    StatusPage,
    StatussortPage,
    ProfilproviderPage,
    HubungiProviderPage,
    HistoryProjectPage
  ],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    Connectivity,
    GoogleMaps,
    Network,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
