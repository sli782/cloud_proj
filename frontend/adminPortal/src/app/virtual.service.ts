import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse, HttpHeaders,} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class VirtualService {


  ConsumerURL = "http://localhost:4000/consumer";
  TemplateURL = "http://localhost:4000/template";
  InstanceURL = "http://localhost:4000/instance";
   



  constructor(private http: HttpClient) { }
  getConsumers(){
    return this
          .http
          .get(`${this.ConsumerURL}`);
   }
  LoginCheck(User){

   




  }

}
