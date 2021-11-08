import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagasinPage } from './magasin.page';

const routes: Routes = [
  {
    path: '',
    component: MagasinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagasinPageRoutingModule {}
