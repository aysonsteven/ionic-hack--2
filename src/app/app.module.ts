import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { Routes } from '@angular/router';
//import { FormsModule } from '@angular/forms';

import { IonicApiModule } from '../api/ionic-api/ionic-api.module';

import { RootComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRouteModule } from './app.route.module';


import { BaseModule } from '../pages/base/base.module';
import { ForumModule } from '../pages/forum/forum.module';
import { PhilgoApiModule } from '../api/philgo-api/v2/philgo-api-module';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    IonicApiModule,
    AppRouteModule,
    NgbModule.forRoot(),
    BaseModule,
    PhilgoApiModule,
    ForumModule
  ],
  bootstrap: [ RootComponent ],
  providers: [ ]
})
export class AppModule {}


