import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriesPageRoutingModule } from './favories-routing.module';

import { FavoriesPage } from './favories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriesPageRoutingModule
  ],
  declarations: [FavoriesPage]
})
export class FavoriesPageModule {}
