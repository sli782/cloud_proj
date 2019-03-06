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
  ConsumerURL = "http://localhost:4000/consumer";
  TemplateURL = "http://localhost:4000/template";
  InstanceURL = "http://localhost:4000/instance";




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
    const newVM={userId:ID,configurationTemplate:vmType}
    this.http.post<{result:any}>('http://localhost:3000/instance',newVM)
      .subscribe((responseData)=>{
        console.log(responseData);
        this.InstanceCollections.push(newVM);
        this.usersUpdated.next([...this.InstanceCollections]);
        this.getPosts();

      });

  }
setUserID(uID:string){
    this.userID=uID;

}
  getPosts(){
    this.http.get('http://localhost:3000/instance')
      .subscribe(res =>{
        this.InstanceCollections =res;
        console.log("xixi"+res);
        this.usersUpdated.next([...this.InstanceCollections]);
      });
    console.log("1");
  }
 getUserID(){
   return this.userID;
 }

  deletePost(vmID: string) {

    this.http.get("http://localhost:3000/instance/delete/" + vmID)
      .subscribe(() => {

      });

    const updatedVM = this.InstanceCollections.filter(newVM => newVM._id !== vmID);
    this.InstanceCollections = updatedVM;
    this.usersUpdated.next([...this.InstanceCollections]);
  }
  getUserUpdateListener(){
    return this.usersUpdated.asObservable();
  }
  LoginCheck(User){






  }

}
