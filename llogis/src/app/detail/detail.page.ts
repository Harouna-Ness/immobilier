import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, IonContent, LoadingController, ModalController, ToastController } from '@ionic/angular';
// import {SMS} from "@ionic-native/sms/ngx";
import {CallNumber} from "@ionic-native/call-number/ngx";
import {SendSMSPage} from "./send-sms/send-sms.page";
import {AngularFirestore} from "@angular/fire/firestore";
import {ReservationPage} from "./reservation/reservation.page";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  annonces: any;
  move='boutton';
  opacity='opacity1';
  foot="footer1";
  valeur:any;

  slideOpts = {
    // initialSlide: 0,
    direction: 'horizontal',
    // speed: 300,
    spaceBetween: 8,
    slidesPerView: 1.1,
    autoplay: true,
    // freeMode: true,
    loop: true
  }

  constructor(
    private location: Location,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private actionSheet: ActionSheetController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private callNumber: CallNumber,
    private db: AngularFirestore
    // private sms: SMS,
    // private appeler: CallNumber
    ) {
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        this.annonces = JSON.parse(queryParams.annonce);
        console.log('annonce', this.annonces);
      });
  }

  retour() {
    this.location.back();
  }

  async showAlert1() {
    const alert = await this.alertCtrl.create({
      header: "Votre inscription a été prise en compte.",
      buttons: [
        {
          text: 'Ok !',
          role: "cancel",
        },
      ]
    });
    alert.present();
  }

  async showLoad() {
    const load = await this.loadCtrl.create({
      message:"Patientez un moment",
      spinner:'lines',
      duration: 4000
    });
    load.present();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message:"Votre reservation a été prise en compte.",
      duration: 4000,
      color:'secondary',
      position:'bottom',
      buttons:[
        {
          text: 'Fermer',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  top() {
    this.content.scrollToTop(500);
  }

  scroll(ev) {
    this.valeur=ev.detail.scrollTop-1;
    if (ev.detail.scrollTop > 44) {
      this.opacity="opacity";
      this.foot="footer";
    } else if (ev.detail.scrollTop > this.valeur) {
      this.opacity="opacity1";
      this.foot="footer1";
    }
    console.log(ev.detail);
    console.log(this.valeur);
  }

  ngOnInit() {
  }

  call() {
    this.callNumber.callNumber("75508128", true).then((cal) => {
      console.log("calling...");
    }).catch((err) => {
      console.log("err", err);
      console.log("err2", err);
    })
  }



  async goToSendSms() {
    this.openModal(SendSMSPage, this.annonces.annonce)
  }


  async openModal(page, data) {
    const modal = await this.modalCtrl.create({
      component: page,
      componentProps: {
        logis: data
      }
    });
    await modal.present();
  }

  reserver() {
    this.openModal(ReservationPage, this.annonces.annonce);
  }
}
