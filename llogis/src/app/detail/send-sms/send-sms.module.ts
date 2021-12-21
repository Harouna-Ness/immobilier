import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendSMSPageRoutingModule } from './send-sms-routing.module';

import { SendSMSPage } from './send-sms.page';
import {AutosizeModule} from 'ngx-autosize';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendSMSPageRoutingModule,
    AutosizeModule
  ],
  declarations: [SendSMSPage]
})
export class SendSMSPageModule {}
