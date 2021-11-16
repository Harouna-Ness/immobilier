import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {
  annonces: any;

  constructor(private location: Location) { }

  retour() {
    this.location.back();
  }
  ngOnInit() {
  }

  goToDetail(annonce: any) {

  }

  save(annonce: any) {

  }
}
