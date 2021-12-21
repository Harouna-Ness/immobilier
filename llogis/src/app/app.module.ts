import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {CallNumber} from "@ionic-native/call-number/ngx";
// import {SMS} from "@ionic-native/sms/ngx";
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from "../environments/environment";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CallNumber,
    SMS,
    AndroidPermissions
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
