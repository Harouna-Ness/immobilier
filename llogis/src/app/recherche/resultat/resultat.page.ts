import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {RechercheAppart} from "../../model/recherche";
import {map} from "rxjs/operators";
import {Logis} from "../../model/model";
import {AngularFirestore} from "@angular/fire/firestore";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {
  annonces: any;
  rechercheAppart: RechercheAppart = new RechercheAppart();
  tablocal: any[];
  mesFavories:any[] = [];
  added: boolean = false;
  premierElement: any = [];
  dernierElement: any = [];
  fin: boolean = false;
  limite: number = 2;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private db: AngularFirestore,
              private toat: ToastController,
              private router: Router,) { }

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

  goToDetail(data) {
    let navigation : NavigationExtras = {
      queryParams: {
        annonce: JSON.stringify(data),
      }
    }
    this.router.navigate(['detail'], navigation);
    console.log('data',data);
  }

  save(data) {
    if (!this.tablocal) {
      // premierement
      if (this.mesFavories.length === 0) {
        console.log('cas ou mesFavories est vide ');
        this.mesFavories.push(data);
        localStorage.setItem('donnes', JSON.stringify(this.mesFavories));
        this.presentToast();
        console.log('mesFavories ',this.mesFavories);
      } else {
        for (let i = 0; i < this.mesFavories.length; i++) {
          console.log('cas ou mesFavories n\'est pas vide ');
          const element = this.mesFavories[i].id;
          if (element === data.id) {
            console.log('data existe deja');
            this.Toast();
            this.added=true;
            console.log(this.added);
          }
        }

        if (this.added==false) {
          console.log('data n\'existe deja');
          this.mesFavories.push(data);
          localStorage.setItem('donnes', JSON.stringify(this.mesFavories));
          this.presentToast();
          console.log('data ajouté');
          console.log('mesFavories ',this.mesFavories);
        }
        this.added=false;
        console.log('la valeur de added a la fin ', this.added);
      }
    } else {
      // deuxiement
      for (let i = 0; i < this.tablocal.length; i++) {
        console.log('cas ou tablocal n\'est pas vide ');
        const element = this.tablocal[i].id;
        if (element === data.id) {
          console.log('data existe deja');
          this.Toast();
          this.added=true;
          console.log(this.added);
        }
      }

      if (this.added==false) {
        this.tablocal.push(data);
        localStorage.setItem('donnes', JSON.stringify(this.tablocal));
        this.presentToast();
        console.log('tablocal ',this.tablocal);
      }

      this.added=false;
      console.log('la valeur de added a la fin ', this.added);
    }

  }

  getAnnonceByCategorie(categorieId) {
    this.db.collection('logis', ref => ref.where("type", '==', categorieId))
    .snapshotChanges()
      .subscribe(response => {

      if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        console.log('premierElement',this.premierElement);

        this.annonces = [];
        this.annonces = response.map(item => {
          return {
            id: item.payload.doc.id,
            annonce: item.payload.doc.data()
          }
        });
        console.log("annonce Trouvée", this.annonces);
      });
  }
  getAnnonceByLocal(localId) {
    this.db.collection('logis', ref => ref.where("quartier", '==', localId))
    .snapshotChanges()
      .subscribe(response => {

      if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        console.log('premierElement',this.premierElement);

        this.annonces = [];
        this.annonces = response.map(item => {
          return {
            id: item.payload.doc.id,
            annonce: item.payload.doc.data()
          }
        });
        console.log("annonce Trouvée", this.annonces);
      });
  }
  getAnnonceByPrix(prix) {
    this.db.collection('logis', ref => ref
    .limit(this.limite)
    .orderBy('prix')
    .orderBy('numeroRef')
    .where("prix", '<=', (prix + 10000)))
    .snapshotChanges()
      .subscribe(response => {

      if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        console.log('premierElement',this.premierElement);

        this.annonces = [];
        this.annonces = response.map(item => {
          return {
            id: item.payload.doc.id,
            annonce: item.payload.doc.data()
          }
        });
        console.log("annonce Trouvée", this.annonces);
      });
  }
  getAnnonceByTypeAndLocal(typeId, localId) {
    this.db.collection('logis', ref => ref
    .limit(this.limite)
    // .orderBy('prix')
    .orderBy('numeroRef').
    where("type", '==', typeId)
      .where('quartier', '==', localId)

    )
    .snapshotChanges()
      .subscribe(response => {

      if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        console.log('premierElement',this.premierElement);

        this.annonces = [];
        this.annonces = response.map(item => {
          return {
            id: item.payload.doc.id,
            annonce: item.payload.doc.data()
          }
        });
        console.log("annonce Trouvée", this.annonces);
      });
  }
  getAnnonceByTypeAndPrix(typeId, prix) {
    this.db.collection('logis', ref => ref
    .limit(this.limite)
    .orderBy('prix')
    .orderBy('numeroRef')
    .where("type", '==', typeId)
      .where('prix', '<=', (prix + 10000))

    )
    .snapshotChanges()
      .subscribe(response => {

      if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        console.log('premierElement',this.premierElement);

        this.annonces = [];
        this.annonces = response.map(item => {
          return {
            id: item.payload.doc.id,
            annonce: item.payload.doc.data()
          }
        });
        console.log("annonce Trouvée", this.annonces);
      });
  }
  getAnnonceByLocalAndPrix(localId, prix) {
    this.db.collection('logis', ref => ref
    .limit(this.limite)
    .orderBy('prix')
    .orderBy('numeroRef')
      .where("quartier", '==', localId)
        .where('prix', '<=', (prix + 10000))

    )
    .snapshotChanges()
      .subscribe(response => {

      if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        console.log('premierElement',this.premierElement);

        this.annonces = [];
        this.annonces = response.map(item => {
          return {
            id: item.payload.doc.id,
            annonce: item.payload.doc.data()
          }
        });
        console.log("annonce Trouvée", this.annonces);
      });
  }

  getAnnonceByLocalAndPrixAndType(localId, prix, typeId) {
    this.db.collection('logis', ref => ref
    .limit(this.limite)
    .orderBy('prix')
    .orderBy('numeroRef')
      .where("quartier", '==', localId)
        .where('prix', '<=', (prix + 10000))
        .where('type', '==', typeId)

    )
    .snapshotChanges()
      .subscribe(response => {

      if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        console.log('premierElement',this.premierElement);

        this.annonces = [];
        this.annonces = response.map(item => {
          return {
            id: item.payload.doc.id,
            annonce: item.payload.doc.data()
          }
        });
        console.log("annonce Trouvée", this.annonces);
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

  async presentToast() {
    const toast = await this.toat.create({
      message: 'Ajouté aux favories!',
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
  async Toast() {
    const toast = await this.toat.create({
      message: 'Existe déjà dans les favories!',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }

  loadData(event) {
    console.log('non disponible');
      setTimeout(() => {
        console.log('Done');
        this.next();
        event.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.fin) {
          event.target.disabled = true;
        }
      }, 500);
  }

  next() {
    this.db
      .collection('logis', ref => ref
      .limit(this.limite)
      .orderBy('prix')
      .orderBy('numeroRef')
      .startAfter(this.dernierElement)
    ).snapshotChanges()
      .subscribe(response => {
        if (!response.length) {
          this.fin = true;
          console.log("No Data Available2");
          return;
        }
        this.premierElement = response[0].payload.doc;
        this.dernierElement = response[response.length - 1].payload.doc;
        response.forEach(element => {
          this.annonces.push({
            id: element.payload.doc.id,
            annonce: element.payload.doc.data()
          })
        });
      })
      console.log('next', this.annonces);
  }
}
