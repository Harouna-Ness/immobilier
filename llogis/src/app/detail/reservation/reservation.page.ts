import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {Logis} from "../../model/model";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  sending: boolean = false;
  @Input() logis: Logis;
  telephone: number;
  telephone2: number;

  constructor(private modalCtrl: ModalController,
              private db: AngularFirestore,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }
  close() {
    this.modalCtrl.dismiss();
  }

  async sendToast(message, color) {
    const tost = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 4000,
      position: 'top'
    });
    await tost.present();
  }

  reserver() {
    if (this.telephone) {
     if (this.telephone == this.telephone2) {
       this.sending = true;
       this.db.collection("demande").add({
         phone: this.telephone,
         logis: this.logis,
         etat: "EN TRAITEMENT",
         createdAt: new Date().getTime()
       }).then(() => {
         this.sendToast("Votre reservation est soumise avec succès. Nous vous contacterons bientôt !", 'success');
         this.close();
         this.sending = false;
       }).catch(() => {
         this.sendToast("Erreur de soumission de demande. Veuillez réessayer plus tard !", 'danger');
         this.sending = false;
       });
     } else {
       this.sendToast("Les numéros de téléphone ne correspondent pas !", 'secondary');
     }
    } else {
      this.sendToast("Veuillez inserer votre numéro de téléphone !", 'secondary');
    }
  }
}
