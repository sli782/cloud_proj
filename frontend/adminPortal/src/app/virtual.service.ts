import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse, HttpHeaders,} from '@angular/common/http';
import{Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VirtualService {
private usersUpdated=new Subject();
private userID:string;
InstanceCollections:any = [];
  ConsumerURL = "http://3.80.181.39:4000/consumer";
  TemplateURL = "http://3.80.181.39:4000/template";
  InstanceURL = "http://3.80.181.39:4000/instance";




  constructor(private http: HttpClient) { }
  getConsumers(){
    return this
          .http
          .get(`${this.ConsumerURL}`);

   }
  getInstance(){
    return this
          .http
          .get(`${this.InstanceURL}`);

  }


 /* getPosts(){
    this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData)=>{
        this.posts=postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
    console.log("1");
  }*/
  addPost(virtualType:string,id:string){
   /* const post:Post ={id: null, title:title,content: content};*/
    const vmType=virtualType;
    const ID=id;
    const newVM={user:ID,configurationTemplate:vmType,start:true,stop:false,currentEvent:null};
    this.http.post<{result:any}>('http://3.80.181.39:4000/instance',newVM)
      .subscribe((responseData)=>{
        console.log("service.addPost works fine");
        this.InstanceCollections.push(newVM);
        this.usersUpdated.next([...this.InstanceCollections]);
        this.getPosts();

      });

  }

setUserID(uID:string){
    this.userID=uID;

}
  getPosts(){
    this.http.get('http://3.80.181.39:4000/instance')
      .subscribe(res =>{
        this.InstanceCollections =res;
        console.log("service.getPost works fine");
        this.usersUpdated.next([...this.InstanceCollections]);
      });
  }
 getUserID(){
   return this.userID;
 }
 startVM(vmID:string, templateType:string){
    console.log(this.userID);
    const newStart={user:this.userID,configurationTemplate:templateType};
    this.http.post("http://3.80.181.39:4000/instance/start/"+ vmID,newStart)
      .subscribe((responseData)=>{
        console.log("service.startVM works fine");
        this.getPosts();

      });
   this.getPosts();
}
 stopVM(vmID:string,templateType:string){
    const newStop={user:this.userID, configurationTemplate:templateType};
   this.http.post("http://3.80.181.39:4000/instance/stop/"+ vmID,newStop)
     .subscribe((responseData)=>{
       console.log("service.stopVM works fine");
       this.getPosts();

     });
console.log("Stop Request Sent!")
 }
  deletePost(vmID: string) {

    this.http.get("http://3.80.181.39:4000/instance/delete/" + vmID)
      .subscribe(() => {

      });

    const updatedVM = this.InstanceCollections.filter(newVM => newVM._id !== vmID);
    this.InstanceCollections = updatedVM;
    this.usersUpdated.next([...this.InstanceCollections]);
  }


  upgradeVM(vmID:string){
    this.http.get("http://3.80.181.39:4000/instance/upgrade/" + vmID)
      .subscribe(() => {

      });
    for(let entry of this.InstanceCollections) {
      if (entry._id==vmID) {
        if (entry.configurationTemplate == "Basic Virtual Server Instance") {
          entry.configurationTemplate = "Large Virtual Server Instance";
          console.log(entry.configurationTemplate);
        } else if (entry.configurationTemplate == "Large Virtual Server Instance") {
          entry.configurationTemplate = "Ultra-Large Virtual Server Instance";
          console.log(entry.configurationTemplate);
        } else if (entry.configurationTemplate == "Ultra-Large Virtual Server Instance") {
          alert("It is the best model");
        }

      }
    }
    this.usersUpdated.next([...this.InstanceCollections]);


  }
  downgradeVM(vmID:string){
    this.http.get("http://3.80.181.39:4000/instance/downgrade/" + vmID)
      .subscribe(() => {

      });
    for(let entry of this.InstanceCollections) {
      if (entry._id==vmID) {
        if (entry.configurationTemplate == "Basic Virtual Server Instance") {
          alert("It is at the lowest level");
        } else if (entry.configurationTemplate == "Large Virtual Server Instance") {
          entry.configurationTemplate = "Basic Virtual Server Instance";
          console.log(entry.configurationTemplate);
        } else if (entry.configurationTemplate == "Ultra-Large Virtual Server Instance") {
          entry.configurationTemplate = "Large Virtual Server Instance";
          console.log(entry.configurationTemplate);
        }

      }
    }
    this.usersUpdated.next([...this.InstanceCollections]);


  }
  getUserUpdateListener(){
    return this.usersUpdated.asObservable();
  }
  LoginCheck(User){






  }

}
