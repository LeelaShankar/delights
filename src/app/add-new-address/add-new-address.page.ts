import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { AddAddressDTO } from '../Interfaces/AddAddressDTO';
import uuid from 'uuidv4';
import { WebServiceService } from '../web-service.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.page.html',
  styleUrls: ['./add-new-address.page.scss'],
})
export class AddNewAddressPage implements OnInit {
  addressForm: FormGroup = new FormGroup({
    "UnitStreetNo": new FormControl(),
    "StreetName": new FormControl(),
    "City": new FormControl(),
    "State": new FormControl(),
    "Mobile": new FormControl(),
    "AddressType": new FormControl()
  })

  locationCategories: { 'AddressType': string; }[];
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public service: WebServiceService,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.locationCategories = [{ 'AddressType': 'Home' }, { 'AddressType': 'Work' }, { 'AddressType': 'Others' }]
    console.log('navCtrl', this.navCtrl, 'modalCtrr', this.modalCtrl)
  }

  saveAddress() {
    let self = this;
    console.log('fggggg', this.addressForm);
    let url = "api/employees/addorupdate";
    let params: AddAddressDTO = new AddAddressDTO();
    params.employeeid = localStorage.getItem('employeeId');
    let addressObj = this.addressForm.value;
    addressObj['id'] = uuid()
    params.address.push(addressObj)
    this.service.addAddress(url, params).subscribe(res => {
      console.log('ressss', res)
      self.openAlert(res)
    })
  }

  async openAlert(res) {
    let self = this;
    let alert = await this.alertCtrl.create({
      header: 'Success', message: res.message,
      backdropDismiss: true,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          self.close();
        }
      }]
    })
    alert.present();
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('')
  }

  close() {
    this.modalCtrl.dismiss()
  }

}

