import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
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
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.signInAnonymously().then((user) => {
      console.log("user anonyme", user);
    });
  }

}
