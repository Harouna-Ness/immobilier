import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import {map} from "rxjs/operators";
import {Logis} from "../../model/model";
import {AngularFirestore} from "@angular/fire/firestore";
import {RechercheAppart} from "../../model/recherche";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  type: any;
  prix: any;
  quartier: any;
  categories: any[] = [];
  quartiers: any[] = [];
  rechercheAppart: RechercheAppart = new RechercheAppart();

  constructor(
    private modal: ModalController,
    private router: Router,
    private db: AngularFirestore
    ) {
    this.rechercheAppart.prix = null;
    this.rechercheAppart.typeLocalId = null;
    this.rechercheAppart.quartierId = null;
  }

  close() {
    this.modal.dismiss();
  }

  chercher() {
    let nav: NavigationExtras = {
      queryParams: {
        rechercheAppart: JSON.stringify(this.rechercheAppart)
      }
    };
    this.router.navigate(['resultat'], nav).then(()=>{this.close()});
  }

  valider() {
    console.log(this.quartier.trim());

  }
  ngOnInit() {
    this.getCategories();
    this.getQuatier();
  }

  getCategories() {
    this.db.collection('categorie').snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }
  getQuatier() {
    this.db.collection('quartier').snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.quartiers = res;
      console.log(this.quartiers);
    });
  }
}
