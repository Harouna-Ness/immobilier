import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Platform} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Annonces', url: '/annonce', icon: 'home' },
    { title: 'Favories', url: '/favories', icon: 'heart' },
  ];

  public cateries = [
    { title: 'Villas', url: '/villa', icon: 'home', color: '' },
    { title: 'Apparts Meublés', url: '/appatement', icon: 'business', color: '' },
    { title: 'Apparts Non Meublés', url: '/cours-com', icon: 'business', color: '' },
    { title: 'Magasins', url: '/magasin', icon: 'storefront', color: '' },
  ]
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];


  constructor(private afAuth: AngularFireAuth,
              private platform: Platform,
              private statusBar: StatusBar,
              private androidPermissions: AndroidPermissions) {
    this.afAuth.signInAnonymously().then((user) => {
      console.log("user anonyme", user);
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#1ba589');
      this.usePermission();
    });
  }

  usePermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS]);
  }

}
