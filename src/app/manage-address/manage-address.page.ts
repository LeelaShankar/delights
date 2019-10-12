import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController, NavParams } from '@ionic/angular';
import { WebServiceService } from '../web-service.service';
import { AddAddressDTO } from '../Interfaces/AddAddressDTO';
import { AddNewAddressPage } from '../add-new-address/add-new-address.page';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.page.html',
  styleUrls: ['./manage-address.page.scss'],
})
export class ManageAddressPage implements OnInit {
  addressList: Array<any> = [];
  canEdit: boolean = false;
  locationCategories: Array<any> = [];
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public service: WebServiceService,
    public alertctrl: AlertController, public navparams: NavParams) { }

  ngOnInit() {
    let self = this;
    self.getAddresses();
    this.locationCategories = [{ 'AddressType': 'Home' }, { 'AddressType': 'Work' }, { 'AddressType': 'Others' }]
  }

  getAddresses() {
    let self = this;
    let url = 'api/employees/address/' + localStorage.getItem('employeeId')
    this.service.getAddress(url).subscribe(res => {
      self.addressList.splice(0);
      self.addressList = self.addressList.concat(res.address)
      self.addressList.map(x => x.canEdit = false)
    })
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot([''])
  }
  close() {
    this.modalCtrl.dismiss()
  }


  addAddress() {
    this.openAddAddress();

  }

  async openAddAddress() {
    let self = this;
    console.log('in adddress');
    let modal = await this.modalCtrl.create({
      component: AddNewAddressPage
    })
    modal.onDidDismiss().then(x => {
      self.getAddresses();
    })
    // let data = await modal.onDidDismiss();
    // console.log('dataaa', data)
    return modal.present();
  }

  deleteAddress(address) {
    let self = this;
    let url = 'api/employees/savedaddress';
    let params: any = {};
    params.employeeid = localStorage.getItem('employeeId');
    params.id = address.id;
    console.log('addresss', address)
    this.service.deleteAddress(url, params).subscribe(res => {
      console.log('ressssssssss', res)
      // self.getAddresses()
      self.openAlert(res)
    })
  }

  saveAddress(address) {
    let self = this;
    console.log('addresss', address);
    let url = "api/employees/addorupdate";
    let params: AddAddressDTO = new AddAddressDTO();
    params.employeeid = localStorage.getItem('employeeId');
    params.address.push(address);
    console.log('paramssss', params)
    this.service.addAddress(url, params).subscribe(response => {
      console.log('responseee', response)
      self.openAlert(response)
    })
  }

  async openAlert(res) {
    let self = this;
    let alert = await this.alertctrl.create({
      header: 'Success', message: res.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          self.getAddresses()

        }
      }]
    })
    alert.present();
  }
}
