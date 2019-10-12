import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { WebServiceService } from '../web-service.service';
import { ViewGiftsPage } from '../view-gifts/view-gifts.page';

@Component({
  selector: 'app-view-delights',
  templateUrl: './view-delights.page.html',
  styleUrls: ['./view-delights.page.scss'],
})

export class ViewDelightsPage implements OnInit {
  clusters: Array<any> = []
  groupNames: Array<any> = [];
  iconProperties: { 'icon': string } = { "icon": ' ' };
  constructor(public navParams: NavParams, public navCtrl: NavController, public modalCtrl: ModalController, public service: WebServiceService) {

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

  getName(cluster): string {
    let lockCheck = {
      "Birthdays": "lockvaluebirthday",
      "Celebrations": "lockvaluefestival",
      "Delightball": "lockvalue",
      "Ranking System": "lockvalue",
      "Evaluation System": "lockvalue"
    }

    let giftSelectCheck = {
      "Birthdays": "selectionflagbirthday",
      "Celebrations": "selectionflagfestival",
      "Delightball": "selectionflag",
      "Ranking System": "selectionflag",
      "Evaluation System": "selectionflag"
    }

    let setIcon = {
      "icon_1": 'unlock',
      "icon_0": 'lock'
    }

    cluster.icon = setIcon['icon_' + cluster[lockCheck[cluster.planid]]];
    let setFinalIcon = {
      "icon_1": 'checkmark',
      "icon_0": cluster.icon
    }
    cluster.icon = setFinalIcon['icon_' + cluster[giftSelectCheck[cluster.planid]]]
    return cluster.icon
  }
  close() {
    this.modalCtrl.dismiss()
  }

  async viewGiftsPage(cluster, categoryData) {
    cluster.groupname = this.getClusterName(cluster)
    let modal = await this.modalCtrl.create({
      component: ViewGiftsPage,
      componentProps: {
        delight: cluster,
        category: categoryData
      }
    })
    return await modal.present()
  }

  getGifts(cluster) {

    console.log('cluster icon', cluster.icon)
    if (cluster.icon == 'unlock') {
      let self = this;
      // let url = 'api/group/' + cluster.groupid
      // let giftsGroupObs = this.service.getGiftsGroup(url);
      // giftsGroupObs.subscribe(res => {
      //   console.log('resssssss', res)
      let categoryUrl = 'api/categories/' + cluster.categoryid;
      let giftsCategoryObs = self.service.getGiftsCategory(categoryUrl);
      giftsCategoryObs.subscribe(resp => {
        console.log('ressppp', resp);
        self.viewGiftsPage(cluster, resp)
      })
      // })
    }
  }
}
