import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppatementPageRoutingModule } from './appatement-routing.module';

import { AppatementPage } from './appatement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppatementPageRoutingModule
  ],
  declarations: [AppatementPage]
})
export class AppatementPageModule {}
