import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ViewProfilePage } from '../view-profile/view-profile.page';
import { ChangePasswordPage } from '../change-password/change-password.page';
import { ManageAddressPage } from '../manage-address/manage-address.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  profileItems: Array<any> = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) { }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot([''])
  }

  ngOnInit() {
    this.profileItems = [{ 'icon': 'person', 'name': 'Profile' }, { 'icon': 'bookmarks', 'name': 'Manage Address' },
    { 'icon': 'key', 'name': 'Change Password' }];

  }

  navigate(item) {
    let obj = {
      'Profile': ViewProfilePage,
      'Change Password': ChangePasswordPage,
      'Manage Address': ManageAddressPage
    }
    // this.navCtrl.navigateForward()
    this.openPage(obj[item.name])
    // this.navCtrl.navigateForward(obj[item.name])
  }

  async openPage(page) {
    let modal = await this.modalCtrl.create({
      component: page
    })
    return await modal.present();
  }
}
