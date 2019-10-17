import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  subscription: any;
  static counter: number = 0;
  constructor(public platform: Platform, public toastCtrl: ToastController) {
    console.log('in tabs page ')
  }
  ionViewDidEnter() {
    let self = this;
    this.subscription = this.platform.backButton.subscribe(() => {
      TabsPage.counter++;
      if (TabsPage.counter == 1) self.openToast()
      if (TabsPage.counter == 2) navigator['app'].exitApp();
    });
  }
  ionViewWillLeave() { this.subscription.unsubscribe(); }
  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Click again to exit the app',
      duration: 2000
    });
    toast.present();
  }
}
