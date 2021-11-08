import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'annonce',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'annonce',
    loadChildren: () => import('./annonce/annonce.module').then( m => m.AnnoncePageModule)
  },
  {
    path: 'favories',
    loadChildren: () => import('./favories/favories.module').then( m => m.FavoriesPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'villa',
    loadChildren: () => import('./categories/villa/villa.module').then( m => m.VillaPageModule)
  },
  {
    path: 'appatement',
    loadChildren: () => import('./categories/appatement/appatement.module').then( m => m.AppatementPageModule)
  },
  {
    path: 'cours-com',
    loadChildren: () => import('./categories/cours-com/cours-com.module').then( m => m.CoursComPageModule)
  },
  {
    path: 'magasin',
    loadChildren: () => import('./categories/magasin/magasin.module').then( m => m.MagasinPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./recherche/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'resultat',
    loadChildren: () => import('./recherche/resultat/resultat.module').then( m => m.ResultatPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
