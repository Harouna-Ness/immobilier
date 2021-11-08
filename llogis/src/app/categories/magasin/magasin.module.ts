import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MagasinPageRoutingModule } from './magasin-routing.module';

import { MagasinPage } from './magasin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MagasinPageRoutingModule
  ],
  declarations: [MagasinPage]
})
export class MagasinPageModule {}
