import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { WebServiceService } from '../web-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  loginDisable: boolean = false;
  changePwdForm: FormGroup = new FormGroup({
    'oldpassword': new FormControl(),
    'newpassword': new FormControl(),
    'confirmpassword': new FormControl()
  })

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public service: WebServiceService,
    public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot([''])
  }

  close() {
    this.modalCtrl.dismiss()
  }

  changePwd() {
    let self = this;
    this.loginDisable = true;
    let url = 'api/employees/changepassword';
    let params: any = {};
    params = this.changePwdForm.value;
    params.emailid = localStorage.getItem('emailid');
    delete params.confirmpassword;
    this.service.changePassword(url, params).subscribe(res => {
      console.log('ressss', res);
      self.openAlert(res)
    })
  }

  async openAlert(res) {
    let self = this;
    let alert = await this.alertCtrl.create({
      header: 'Success', message: res.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          self.modalCtrl.dismiss();
        }
      }]
    })
    alert.present();
  }
}
