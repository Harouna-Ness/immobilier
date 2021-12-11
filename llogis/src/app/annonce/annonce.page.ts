import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../recherche/modal/modal.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Logis } from '../model/model';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.page.html',
  styleUrls: ['./annonce.page.scss'],
})
export class AnnoncePage implements OnInit {

  vrai: boolean = false;
  mesFavories:any[] = [];
  tablocal: any[];
  annonces: any;
  added: boolean = false;

  slideOpts = {
    // initialSlide: 0,
    // direction: 'horizontal',
    // speed: 300,
    spaceBetween: 1,
    // slidesPerView: 1.2,
    // autoplay: true,
    freeMode: true,
    // loop: true
  };
  categories: any[] = [];

  constructor(private router: Router,
              private toat: ToastController,
              private modal: ModalController,
              private db: AngularFirestore,
             ) {
    // this.initialisation();
    this.recup();
    this.tablocal = JSON.parse(localStorage.getItem('donnes'));
    console.log('tablocal ',this.tablocal);
  }

  initialisation() {
    this.annonces = [
      {
        type:'Appart Meuble',
        titre:'3 chambre sallon a kalaban coro plateau',
        description: 'description',
        nombreChambre: '',
        nombreSalon: '',
        prix:'25000',
        id: 0,
        numeroRef: '',
        quartier: 'kalaban coro plateau',
        commodites:'wifi, climatiseurs...',
        formule: 'mois',
        image:['/assets/imo1.jpg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Magagin',
        titre:'8sur7 au centre ville [OUS[OW QUPQ[Q QBUQ[OQO QB[QOC[QC UQBW[QUE[ QB[QH[QQ  C BQUB[QOQ BX[UW',
        prix:'125000',
        id: 5,
        image:['/assets/imo2.jpg', '/assets/imo1.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart Nmeuble',
        titre:'3 chambre sallon a Hamdalaye aci 2000',
        prix:'50000',
        id: 4,
        image:['/assets/imo3.jpeg', '/assets/imo2.jpg', '/assets/imo1.jpg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart Nmeuble',
        titre:'1 chambre sallon a Niamacoro',
        prix:'15000',
        id: 3,
        image:['/assets/imo4.jpeg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo1.jpg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Magagin',
        titre:'7sur5 mettre baco djicroni aci',
        prix:'15000',
        id: 2,
        image:['/assets/imo5.jpeg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo1.jpg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart',
        titre:'2 chambre sallon a kalaban coro koulouba',
        prix:'20000',
        id: 1,
        image:['/assets/imo6.jpeg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo1.jpg'],
      },
    ];

    return this.annonces;
  }

  recup() {
    this.db.collection('logis').snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log(this.annonces);
    });
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

  rendreVrai() {
    if(this.vrai==false) {
      this.vrai=true;
    }
    else{
      this.vrai=false;
    }
    console.log(this.vrai);
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

  aimer() {
    console.log('this.tablocal ',this.tablocal);
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


      // this.mesFavories.push(data);
      // localStorage.setItem('donnes', JSON.stringify(this.mesFavories));
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

      // this.tablocal.push(data);
      // localStorage.setItem('donnes', JSON.stringify(this.tablocal));
    }
    // this.presentToast();
  }

  voirFavories() {
    let navigation : NavigationExtras = {
      queryParams: {
        mesFavories: JSON.stringify(this.mesFavories),
      }
    };
    this.router.navigate(['aimes'],navigation);
  }

  filtre(ev: any) {
    this.initialisation();
    const val = ev.target.value;
    if(val && val.trim() != "") {
      this.annonces = this.annonces.filter((annonce) => {
        return (annonce.type.toLowerCase().indexOf(val.toLowerCase())>-1 || annonce.prix.toString().toLowerCase().indexOf(val.toLowerCase())>-1);
      })
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

  async presentModal() {
    const modal = await this.modal.create({
    component: ModalPage,
    });

    await modal.present();

  }

  ngOnInit() {
  this.getCategories();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    if(ev.detail.value=='past') {
      alert('past trouvé');
    }
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
  goToAnnonceByCategorie(categorie) {
    console.log("type", categorie);
    this.getAnnonceByCategorie(categorie.id);
  }

}
