import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favories',
  templateUrl: './favories.page.html',
  styleUrls: ['./favories.page.scss'],
})
export class FavoriesPage implements OnInit {
  mesFavories: any[] = JSON.parse(localStorage.getItem('donnes'));

  constructor(private router: Router, private toat: ToastController) {
    // this.mesFavories = JSON.parse(localStorage.getItem('donnes'));
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

  supprimer(mesFavories, index:number) {
    this.mesFavories.splice(index, 1);
    this.mesFavories=this.mesFavories;
    localStorage.setItem('donnes', JSON.stringify(this.mesFavories));
    console.log(this.mesFavories);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toat.create({
      message: 'Supprimé !',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }
  ngOnInit() {
  }

}
