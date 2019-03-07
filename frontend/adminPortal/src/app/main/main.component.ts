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
  startButton:any=[];
  AllConsumers:any=[];
  totalCharge:number=0;
  constructor(public virtualService:VirtualService) { }


  onAddPost(form : NgForm){
    if(form.invalid){
      return;
    }
console.log("create event "+form.value.title);
    this.userID=this.virtualService.getUserID();

this.virtualService.addPost(form.value.title,this.userID);
    /*this.postsService.addPost(form.value.title, form.value.content)*/
    form.resetForm();
/*this.update();*/
  }

  onStop(vmID:string,templateType:string){
    this.virtualService.stopVM(vmID,templateType);
  }

  onStart(vmID:string,templateType:string){
    /*this.startButton.push({virtualID:vmID,disables:true});*/
    this.virtualService.startVM(vmID,templateType);
  }
  onDelete(vmID:string) {
    this.virtualService.deletePost(vmID);
/*this.update();*/
  }

  onUpgrade(vmID:string){
    this.virtualService.upgradeVM(vmID);
  }
  onDowngrade(vmID:string){
    this.virtualService.downgradeVM(vmID);
  }
  onCharge(){
    this.virtualService.getConsumers().subscribe(res=>{
        this.AllConsumers = res,
          console.log(this.AllConsumers);
      for(var i=0; i< this.AllConsumers.length; i++){
        this.userID=this.virtualService.getUserID();
        console.log(this.userID);
        if(this.AllConsumers[i]['_id']==this.userID)
        {console.log("aaaa");
          this.totalCharge=this.AllConsumers[i]['charge'];
          console.log(this.totalCharge);
        }
        else{
          continue;
        }
      }
      },

    );

  }

  ngOnInit() {
   /* this.virtualService.getInstance().subscribe(res =>{
            this.InstanceCollections =res;
    })*/
this.virtualService.getPosts();
this.usersSub==this.virtualService.getUserUpdateListener().subscribe((res:any)=>{
  this.InstanceCollections=res;

  console.log("Observable Works"+res);
});

  }

/*update(){
    this.ngOnInit();
}*/
  ngOnDestroy(){
    this.usersSub.unsubscribe();
  }
}
