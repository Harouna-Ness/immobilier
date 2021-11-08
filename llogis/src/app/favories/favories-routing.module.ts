import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriesPage } from './favories.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriesPageRoutingModule {}
