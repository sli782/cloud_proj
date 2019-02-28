import { Component, OnInit } from '@angular/core';
import {VirtualService} from '../virtual.service';
import { FormGroup,  FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  angForm: FormGroup;
  AllConsumers: any =[];
  UserName ='';
  password ='';
  passwordCheck = false;
  constructor(private virtualService: VirtualService, private fb: FormBuilder, public router: Router) { 
    this.createForm();
  }

  ngOnInit() {
   this.virtualService.getConsumers().subscribe(res=>{
    this.AllConsumers = res,
    console.log(this.AllConsumers);
   },
  
   )
  }
  createForm() {
    this.angForm = this.fb.group({
      user: [''],
      password: [''],
    });
  }
  checkLogin(name, password){
    for(var i=0; i< this.AllConsumers.length; i++){
       if(this.AllConsumers[i]['name']== name && this.AllConsumers[i]['password'] == password)
       {
        this.router.navigate(['main']);
       }
       else{
         continue;
       }
    }
    this.passwordCheck = true;
  }


}
