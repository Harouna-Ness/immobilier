import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppatementPage } from './appatement.page';

const routes: Routes = [
  {
    path: '',
    component: AppatementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppatementPageRoutingModule {}
