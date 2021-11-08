import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';
// import { SMS } from '@ionic-native/sms/ngx';
import { ActionSheetController, AlertController, IonContent, LoadingController, ModalController, ToastController } from '@ionic/angular';

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

  // async goToView(data) {
  //   const modal = await this.modalCtrl.create({
  //     component: ViewPage,
  //   });
  //   modal.present();
  //   console.log('im', data);

  // }

  // call() {
  //   this.appeler.callNumber("0022376130477", true)
  //   .then(res => console.log('Launched dialer!', res))
  //   .catch(err => console.log('Error launching dialer', err));
  // }

  // sendSms() {
  //   this.sms.send('0022390555053', 'test du plugin sms').then((res) => {
  //     console.log('envoyer');
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }

  async showAction() {
    const action = await this.actionSheet.create({
      header: 'Reservation',
      backdropDismiss: true,
      animated: true,
      buttons: [
        {
          text: 'Appeler',
          icon: 'call',
          handler: () => {
            console.log('Appel lancee!');
          }
        },

        {
          text: 'SMS',
          icon: 'chatbubble-ellipses',
          handler: () => {
            console.log('Texto SMS!');
          }
        },

        {
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            console.log('Texto Whatsapp!');
          }
        },
      ]
    });
    action.present();
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

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: "Veillez renseigner votre numero afin de pouvoir faire cette reservation.",
      inputs: [
        {
          name:'Numero de telephone',
          type: 'tel',
          placeholder: "Entrez votre numero de telephone"
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: "cancel",
        },
        {
          text: "Continuer",
          handler: (data) => {
            this.showLoad().then(()=>{
              setTimeout(()=>{
                this.showToast();
              },5000);
            });
            console.log('Inscrit !', data);
          }
        }
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

}
