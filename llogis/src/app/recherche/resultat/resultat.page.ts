import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RechercheAppart} from "../../model/recherche";
import {map} from "rxjs/operators";
import {Logis} from "../../model/model";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {
  annonces: any;
  rechercheAppart: RechercheAppart = new RechercheAppart();

  constructor(private location: Location,
              private route: ActivatedRoute,
              private db: AngularFirestore) { }

  retour() {
    this.location.back();
  }

  getDataByRouting() {
    this.route.queryParams.subscribe((query) => {
      this.rechercheAppart = JSON.parse(query.rechercheAppart);
      if (this.rechercheAppart.typeLocalId || this.rechercheAppart.quartierId || this.rechercheAppart.prix) {
        this.runSearch(this.rechercheAppart);
      }
      console.log("rechercheAppart", this.rechercheAppart);
    });
  }
  ngOnInit() {
    this.getDataByRouting();
  }

  goToDetail(annonce: any) {

  }

  save(annonce: any) {

  }

  getAnnonceByCategorie(categorieId) {
    this.db.collection('logis', ref => ref.where("type.id", '==', categorieId)).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log("annonce filtered", this.annonces);
    });
  }
  getAnnonceByLocal(localId) {
    this.db.collection('logis', ref => ref.where("quartier.id", '==', localId)).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log("annonce filtered", this.annonces);
    });
  }
  getAnnonceByPrix(prix) {
    this.db.collection('logis', ref => ref.where("prix", '==', prix)).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log("annonce filtered", this.annonces);
    });
  }
  getAnnonceByTypeAndLocal(typeId, localId) {
    this.db.collection('logis', ref => ref.
    where("type.id", '==', typeId)
      .where('quartier.id', '==', localId)

    ).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log("annonce filtered", this.annonces);
    });
  }
  getAnnonceByTypeAndPrix(typeId, prix) {
    this.db.collection('logis', ref => ref.
    where("type.id", '==', typeId)
      .where('prix', '==', prix)

    ).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log("annonce filtered", this.annonces);
    });
  }
  getAnnonceByLocalAndPrix(localId, prix) {
    this.db.collection('logis', ref => ref.
      where("quartier.id", '==', localId)
        .where('prix', '==', prix)

    ).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log("annonce filtered", this.annonces);
    });
  }

  getAnnonceByLocalAndPrixAndType(localId, prix, typeId) {
    this.db.collection('logis', ref => ref.
      where("quartier.id", '==', localId)
        .where('prix', '==', prix)
        .where('type.id', '==', typeId)

    ).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log("annonce filtered", this.annonces);
    });
  }

  runSearch(rechercheAppart: RechercheAppart) {
    if ((rechercheAppart.prix != null) && (rechercheAppart.typeLocalId != null) && (rechercheAppart.quartierId != null)) {
      this.getAnnonceByLocalAndPrixAndType(rechercheAppart.quartierId, rechercheAppart.prix, rechercheAppart.typeLocalId);
    }

    if ((rechercheAppart.prix != null) && (rechercheAppart.typeLocalId != null) && (rechercheAppart.quartierId == null)) {
      this.getAnnonceByLocalAndPrix(rechercheAppart.typeLocalId, rechercheAppart.prix);
    }

    if ((rechercheAppart.prix != null) && (rechercheAppart.typeLocalId == null) && (rechercheAppart.quartierId != null)) {
      this.getAnnonceByLocalAndPrix(rechercheAppart.quartierId, rechercheAppart.prix);
    }

    if ((rechercheAppart.prix == null) && (rechercheAppart.typeLocalId != null) && (rechercheAppart.quartierId != null)) {
      this.getAnnonceByTypeAndLocal(rechercheAppart.typeLocalId, rechercheAppart.quartierId);
    }

    if ((rechercheAppart.prix != null) && (rechercheAppart.typeLocalId == null) && (rechercheAppart.quartierId == null)) {
      this.getAnnonceByPrix(rechercheAppart.prix);
    }

    if ((rechercheAppart.prix == null) && (rechercheAppart.typeLocalId != null) && (rechercheAppart.quartierId == null)) {
      this.getAnnonceByCategorie(rechercheAppart.typeLocalId);
    }

    if ((rechercheAppart.prix == null) && (rechercheAppart.typeLocalId == null) && (rechercheAppart.quartierId != null)) {
      this.getAnnonceByLocal(rechercheAppart.quartierId);
    }
  }
}
