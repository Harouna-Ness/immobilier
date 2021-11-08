import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursComPage } from './cours-com.page';

const routes: Routes = [
  {
    path: '',
    component: CoursComPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursComPageRoutingModule {}
