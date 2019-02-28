import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
{
  path: '',
  component: LoginFormComponent
},
{
  path: 'main',
  component: MainComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
