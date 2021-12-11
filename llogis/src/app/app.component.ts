import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Platform} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

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
              private statusBar: StatusBar) {
    this.afAuth.signInAnonymously().then((user) => {
      console.log("user anonyme", user);
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#1ba589');

    });
  }

}
