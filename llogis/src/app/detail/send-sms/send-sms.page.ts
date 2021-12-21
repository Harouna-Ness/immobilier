import {Component, Input, OnInit} from '@angular/core';
import {Logis} from "../../model/model";
import {ModalController, ToastController} from "@ionic/angular";
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.page.html',
  styleUrls: ['./send-sms.page.scss'],
})
export class SendSMSPage implements OnInit {

  @Input() logis: Logis;
  message: string;
  sending: boolean = false;
  constructor(private modalCtrl: ModalController,
              private sms: SMS,
              private toastCtrl: ToastController,
              private db: AngularFirestore
              ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log("logis", this.logis);
    }, 500);
  }

  sendSms() {
    if (this.message) {
      this.sending = true;
      this.sms.send("75508128", this.message + "\n" + "Ref: " + this.logis.numeroRef).then((result) => {
        console.log(result);
        this.sending = false;
        this.close();
        this.sendToast("Message envoyé avec succès, nous vous contacterons dans un instant...", 'primary');
      }).catch((err) => {
        console.log(err);
        this.sending = false;
        this.sendToast("Erreur d'envoi de sms, vérifiez votre crédit de communication !", 'danger');
      });
    }
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


  close() {
    this.modalCtrl.dismiss();
  }
}
