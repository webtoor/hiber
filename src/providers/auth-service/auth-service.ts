import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = "http://localhost/hiber/api/";
//let apiUrl = "http://192.168.43.107/hiber/api/";
/* let apiUrl = "http://webtoor.000webhostapp.com/api/"; */
let apiUrl = "http://127.0.0.1:8000/";



/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  data
  constructor(public http: Http) {
    //console.log('Hello AuthServiceProvider Provider');
  }
  postData(credentials, type, access_token){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      headers.append('Authorization', 'Bearer ' + access_token);
      let options = new RequestOptions({ headers:headers});
      //console.log(options)
      this.http.post(apiUrl+type, JSON.stringify(credentials), options).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

  getData(type, access_token){
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      headers.append('Authorization', 'Bearer ' + access_token);
      let options = new RequestOptions({ headers:headers});
      //console.log(options)
      this.http.get(apiUrl + type, options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
