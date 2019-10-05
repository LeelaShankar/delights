import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WebServiceService } from '../web-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  checkedSegment: string = 'inProgress';
  gifts: Array<any> = [];
  constructor(public navCtrl: NavController, public service: WebServiceService) { }


  ngOnInit() {
    let self = this;
    let url: string = 'api/orders/giftshistory';
    let params: any = {};
    params.employeeid = localStorage.getItem('employeeId');
    let giftsHistoryObs = this.service.getGiftsHistory(url, params);
    giftsHistoryObs.subscribe(res => {
      console.log('ressss', res)
      self.gifts = res.activegiftsdata;
    })
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot([''])
  }

  segmentChanged(evt) {
    console.log('checked segment', this.checkedSegment)
    console.log('evttt', evt)
  }

}
