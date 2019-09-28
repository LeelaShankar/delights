import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-delights',
  templateUrl: './view-delights.page.html',
  styleUrls: ['./view-delights.page.scss'],
})
export class ViewDelightsPage implements OnInit {

  constructor(public navParams: NavParams) {

  }

  ngOnInit() {
    console.log('navParams', this.navParams)
  }

}
