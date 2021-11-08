import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  type: any;
  prix: any;
  quartier: any;

  constructor(
    private modal: ModalController,
    private router: Router
    ) { }

  close() {
    this.modal.dismiss()
  }

  chercher() {
    this.router.navigate(['resultat']).then(()=>{this.close()});
  }

  valider() {
    console.log(this.quartier.trim());

  }
  ngOnInit() {
  }

}
