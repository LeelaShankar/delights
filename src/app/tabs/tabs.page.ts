import { Component } from '@angular/core';
import { Platform, ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  subscription: any;
  static counter: number = 0;

  constructor(public platform: Platform, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    console.log('in tabs page')
  }

  ionViewDidEnter() {
    let self = this;
    this.subscription = this.platform.backButton.subscribe(() => {
      self.modalCtrl.getTop().then(res => {
        if (res) {
          self.modalCtrl.dismiss()
        }
        else {
          TabsPage.counter++;
          if (TabsPage.counter == 1) self.openToast()
          if (TabsPage.counter == 2) navigator['app'].exitApp();
        }
      });
    })
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    console.log('view left in tabs')
  }

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Click again to exit the app',
      duration: 2000
    });
    toast.present();
  }
}
