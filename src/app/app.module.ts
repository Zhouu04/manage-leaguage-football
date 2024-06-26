import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "./admin/admin.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        CarouselComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
