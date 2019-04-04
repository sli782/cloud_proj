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
  usage:string;

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
  onUsage(vmID:string){
    console.log(this.InstanceCollections[0].currentTimeStamp);
    console.log(this.InstanceCollections[0].lastTimeStamp);
    

    for(let entry of this.InstanceCollections) {
      if (entry._id==vmID) {
        var d2 = new Date(entry.lastTimeStamp);
        var d1 = new Date(entry.currentTimeStamp);
        var seconds = (Math.abs(d1.getTime()-d2.getTime())/1000);
        if (seconds>60){
          var minutes=seconds/60;
          var mod=seconds%60;
          // console.log(parseInt(minutes)+" "+parseInt(mod));
          // this.usage=parseInt(minutes).toString()+" min"+parseInt(mod)+" secs";
          console.log(Math.floor(minutes)+" "+Math.floor(mod));
          this.usage=Math.floor(minutes).toString()+" min"+Math.floor(mod)+" secs";
        }
        else{
          console.log(seconds);
          // this.usage=parseInt(seconds).toString()+" secs";
          this.usage=Math.floor(seconds).toString()+" secs";
        }
        
        
        // var minutesDifference = Math.floor(difference/1000/60);
    
        // difference -= minutesDifference*1000*60

        // var secondsDifference = Math.floor(difference/1000);
        // console.log(minutesDifference+"*****"+secondsDifference);
        
      }
    }
    
    


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
        {console.log("Charge on "+this.AllConsumers[i]["name"]);
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
