import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { WebServiceService } from '../web-service.service';
import { LoginReqDTO } from '../Interfaces/loginReqDTO';
import { LoginRespDTO } from '../Interfaces/loginRespDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginDisable: boolean = false;
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl(),
    'password': new FormControl()
  });
  subscription: any;
  constructor(public router: Router, public webservice: WebServiceService, public alertCtrl: AlertController, public navCtrl: NavController,
    public platform: Platform) {
    let token = localStorage.getItem('token');
    console.log('tokenn', token)
    if (token) {
      // this.router.navigate(['tab'])
      this.navCtrl.navigateRoot('tab')
    }
  }

  ngOnInit() {
    console.log('in login page')

  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() { this.subscription.unsubscribe(); }

  successNavigation(res: LoginRespDTO) {
    let self = this;
    if (res.message == "Auth successful") {
      localStorage.setItem('token', res.token);
      localStorage.setItem('emailid', res.emailid);
      localStorage.setItem('organizationid', res.organizationid);
      localStorage.setItem('userfirstname', res.userfirstname);
      localStorage.setItem('userlastname', res.userlastname);
      localStorage.setItem('dateofjoining', res.dateofjoining);
      localStorage.setItem('organizationname', res.organizationname);
      localStorage.setItem('designation', res.designation);
      localStorage.setItem('employeeId', res.userId);

      if (res.loginflag == '1') {
        self.navCtrl.navigateRoot('tab')
        // self.router.navigate(['tab'])
      }
      else if (res.loginflag == '0') {
        self.navCtrl.navigateRoot('temp-password')
        // this.router.navigate(['temp-password'])
      }
    }
    else {
      self.openAlert(res);
    }
  }

  async openAlert(res: LoginRespDTO) {
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

  login() {
    let self = this;
    this.loginDisable = true;
    let fg = this.loginForm
    console.log('fg', fg)
    let params: LoginReqDTO = new LoginReqDTO();
    params.emailid = fg.value.email;
    params.password = fg.value.password;
    let loginObs = self.webservice.employeeLogin('api/employees/login', params);
    loginObs.subscribe(res => {
      console.log('resss', res)
      self.loginDisable = false;
      self.successNavigation(res)
    }, err => {
      self.loginDisable = false;
      self.openAlert(err)
      console.log('erorr', err)
    })
  }

}
