import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-delights',
  templateUrl: './view-delights.page.html',
  styleUrls: ['./view-delights.page.scss'],
})

export class ViewDelightsPage implements OnInit {
  clusters: Array<any> = []
  groupNames: Array<any> = [];
  constructor(public navParams: NavParams, public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  ngOnInit() {
    console.log('navParams', this.navParams)
    let data = this.navParams.data.data
    this.clusters = data.activetransactions;
    this.groupNames = data.groupnames;
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('')
  }


  getClusterName(cluster) {
    let groupObj = this.groupNames.filter(x => x.groupid == cluster.groupid);
    return groupObj[0] && groupObj[0].groupname;
  }

  close() {
    this.modalCtrl.dismiss()
  }
}
