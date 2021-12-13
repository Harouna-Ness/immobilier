import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Logis } from 'src/app/model/model';

@Component({
  selector: 'app-cours-com',
  templateUrl: './cours-com.page.html',
  styleUrls: ['./cours-com.page.scss'],
})
export class CoursComPage implements OnInit {

  vrai: boolean = false;
  mesFavories:any[] = [];
  tablocal: any[];
  texte:string;
  annonces: any;
  annoncePuls: any = [];
  added: boolean = false;
  limite: number = 3;
  x: number = 0;

  constructor(private router: Router,
    private toat: ToastController,
    private db: AngularFirestore,) {
    this.recup();
    // this.initialisation();
    console.log(this.annonces);
    this.tablocal = JSON.parse(localStorage.getItem('donnes'));
    console.log(this.annoncePuls);

  }

  initialisation() {
    this.annonces = [
      {
        type:'Appart Nmeuble',
        detail:'3 chambre sallon a kalaban coro plateau',
        prix:'25000',
        image:['/assets/imo1.jpg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart Nmeuble',
        detail:'8sur7 au centre ville [OUS[OW QUPQ[Q QBUQ[OQO QB[QOC[QC UQBW[QUE[ QB[QH[QQ  C BQUB[QOQ BX[UW',
        prix:'125000',
        image:['/assets/imo2.jpg', '/assets/imo1.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart Nmeuble',
        detail:'3 chambre sallon a Hamdalaye aci 2000',
        prix:'50000',
        image:['/assets/imo3.jpeg', '/assets/imo2.jpg', '/assets/imo1.jpg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart Nmeuble',
        detail:'1 chambre sallon a Niamacoro',
        prix:'15000',
        image:['/assets/imo4.jpeg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo1.jpg', '/assets/imo5.jpeg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart Nmeuble',
        detail:'7sur5 mettre baco djicroni aci',
        prix:'15000',
        image:['/assets/imo5.jpeg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo1.jpg', '/assets/imo6.jpeg'],
      },
      {
        type:'Appart Nmeuble',
        detail:'2 chambre sallon a kalaban coro koulouba',
        prix:'20000',
        image:['/assets/imo6.jpeg', '/assets/imo2.jpg', '/assets/imo3.jpeg', '/assets/imo4.jpeg', '/assets/imo5.jpeg', '/assets/imo1.jpg'],
      },
    ];
  }

  recup() {
    this.db.collection('logis', ref => ref.orderBy('numeroRef').limit(this.limite)).snapshotChanges(['added', 'modified', 'removed']).pipe(
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

  recup1(injecter) {
    this.db.collection('logis', ref => ref.orderBy('numeroRef').startAt((injecter+1)).limit(this.limite)).snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annoncePuls = res;
      console.log('plus',this.annoncePuls);
    });
    // for (let i = 0; i < this.annoncePuls.length; i++) {
    //   this.annonces.push(this.annoncePuls[i])
    // }
    // console.log('new tab',this.annonces);

  }

  boucle() {
    for (let i = this.x; i < this.annonces.length; i++) {
      this.annoncePuls.push(this.annonces[i]);
    }
  }

  loadData(event) {
    setTimeout(() => {
      this.x += this.limite;
      console.log(this.x);
      console.log('Done');
      this.recup1(this.x);

      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
        // event.target.disabled = true;
      // }
    }, 500);
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

  aimer(data) {
    this.mesFavories.push(data);
    console.log('data',data);
    console.log('mesFavories', this.mesFavories);
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

  async presentToast() {
    const toast = await this.toat.create({
      message: 'Ajouté aux favories!',
      duration: 2000
    });
    toast.present();
  }
  async Toast() {
    const toast = await this.toat.create({
      message: 'Existe déjà dans les favories!',
      duration: 2000
    });
    toast.present();
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

  ngOnInit() {
  }

}
