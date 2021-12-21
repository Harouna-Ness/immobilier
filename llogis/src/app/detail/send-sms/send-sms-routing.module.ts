import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendSMSPage } from './send-sms.page';

const routes: Routes = [
  {
    path: '',
    component: SendSMSPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendSMSPageRoutingModule {}
