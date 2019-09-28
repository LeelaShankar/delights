import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WebServiceService } from '../web-service.service';
import { ResetPwdReqDTO } from '../Interfaces/ResetPwdReqDTO';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-temp-password',
  templateUrl: './temp-password.page.html',
  styleUrls: ['./temp-password.page.scss'],
})
export class TempPasswordPage implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    oldPwd: new FormControl(),
    newPwd: new FormControl(),
    cnfrmNewpwd: new FormControl()
  })
  submitDisable: boolean = false;
  constructor(public service: WebServiceService, public navctrl: NavController, public alertCtrl: AlertController) { }

  ngOnInit() {
    console.log('fg', this.changePasswordForm)
  }


  getError(ctrl): string {
    let fg = this.changePasswordForm;
    let error = fg.controls[ctrl].errors;
    return error && error.minlength && "Minimum " + error.minlength.requiredLength + " characters are required"
  }

  async openAlert(res: any) {
    let alert = await this.alertCtrl.create({
      header: 'Error', message: res.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
        }
      }]
    })
    alert.present();
  }

  changePwd() {
    let self = this;
    let fg = this.changePasswordForm;
    console.log('fggg', fg);
    let params: ResetPwdReqDTO = new ResetPwdReqDTO();
    params.emailid = localStorage.getItem('emailid');
    params.oldpassword = fg.value.oldPwd;
    params.newpassword = fg.value.newPwd;
    let resetObs = this.service.resetPwd('api/employees/reset', params);
    resetObs.subscribe(res => {
      console.log('ressss', res)
      if (res.message == "Password reset Successful" && res.loginflag == '1') {
        self.navctrl.navigateRoot(['tab'])
      }
    }, err => {
      self.openAlert(err)
    })
  }


}
