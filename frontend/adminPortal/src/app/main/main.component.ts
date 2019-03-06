import { Component, OnInit,OnDestroy } from '@angular/core';
import {NgForm} from "@angular/forms";
import{VirtualService} from "../virtual.service";
import{Subscription} from "rxjs/index";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
private userID;
  private usersSub:Subscription;
  InstanceCollections:any = [];


  constructor(public virtualService:VirtualService) { }
  onAddPost(form : NgForm){
    if(form.invalid){
      return;
    }
console.log(form.value.title);
    this.userID=this.virtualService.getUserID();

this.virtualService.addPost(form.value.title,this.userID);
    /*this.postsService.addPost(form.value.title, form.value.content)*/
    form.resetForm();
/*this.update();*/
  }


  onDelete(vmID:string) {
    this.virtualService.deletePost(vmID);
/*this.update();*/
  }


  ngOnInit() {
   /* this.virtualService.getInstance().subscribe(res =>{
            this.InstanceCollections =res;
    })*/
this.virtualService.getPosts();
this.usersSub==this.virtualService.getUserUpdateListener().subscribe((res:any)=>{
  this.InstanceCollections=res;
  console.log("hahahahahah"+res);
});
  }
/*update(){
    this.ngOnInit();
}*/
  ngOnDestroy(){
    this.usersSub.unsubscribe();
  }
}
