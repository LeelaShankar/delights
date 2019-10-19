import { Component } from '@angular/core';
import { NavController, ModalController, Platform, ToastController } from '@ionic/angular';
import { WebServiceService } from '../web-service.service';
import { ViewDelightsDTO } from '../Interfaces/ViewDelightsDTO';
import { ViewDelightsPage } from '../view-delights/view-delights.page';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  subscription: any;
  empName: string;
  constructor(public navCtrl: NavController, public service: WebServiceService, public modalCtrl: ModalController) { }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('')
  }

  ngOnInit() {
    this.empName = localStorage.getItem('userfirstname') + " " + localStorage.getItem('userlastname');
    console.log('empNammmme', this.empName)
  }

  async viewDelights(res) {
    let modal = await this.modalCtrl.create({
      component: ViewDelightsPage,
      componentProps: { data: res }
    });
    return await modal.present();
  }

  openDelights() {
    let self = this;
    console.log('in open delights');
    let params: ViewDelightsDTO = new ViewDelightsDTO();
    params.organizationid = localStorage.getItem('organizationid');
    params.employeeid = localStorage.getItem('employeeId')
    let viewDelightsObs = this.service.viewMyDelights('api/emptransactions/lockvalues', params)
    viewDelightsObs.subscribe(res => {
      console.log('resss', res)
      self.viewDelights(res)
    })
  }

}
