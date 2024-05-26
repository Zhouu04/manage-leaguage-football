import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./service/guard.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: "full"},

  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: 'Home',
        info: 'home'
      }
    }
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
