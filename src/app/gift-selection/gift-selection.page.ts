import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { WebServiceService } from '../web-service.service';
import { AddAddressDTO, AddressDTO } from '../Interfaces/AddAddressDTO';
import uuid from 'uuidv4';

@Component({
  selector: 'app-gift-selection',
  templateUrl: './gift-selection.page.html',
  styleUrls: ['./gift-selection.page.scss'],
})
export class GiftSelectionPage implements OnInit {
  addressList: Array<any> = [];
  firstFormGroup: FormGroup = new FormGroup({
    'address': new FormControl(),
    "streetNo": new FormControl(),
    "streetName": new FormControl(),
    "city": new FormControl(),
    "state": new FormControl(),
    "mobile": new FormControl(),
    "addressType": new FormControl()
  })
  secondFormGroup: FormGroup = new FormGroup({
    'message': new FormControl(),
    'rating': new FormControl(0)
  })
  addNewAddress: boolean = false;
  addressTypes: Array<any> = ['Home', 'Work', 'Others'];
  numStars: number = 5;
  stars: Array<string> = [];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public service: WebServiceService, public navParams: NavParams,
    public alertctrl: AlertController) { }

  ngOnInit() {
    console.log('navParams', this.navParams)
    let self = this;
    console.log('in gifts selection');
    self.getAddressList();
    console.log('secFg', this.secondFormGroup)
  }
  getAddressList() {
    let self = this
    let url = 'api/employees/address/' + localStorage.getItem('employeeId')
    let addressObs = this.service.getAddress(url);
    addressObs.subscribe(res => {
      console.log('res in address', res);
      self.addressList.splice(0);
      res.address.map((x, i) => {
        let fullAddress: string = x.UnitStreetNo + ' ' + x.StreetName + ' ' + x.City + ' ' + x.State;
        x['value'] = i;
        x['text'] = fullAddress
        self.addressList.push(x)
      })
      self.addressList.unshift({ 'value': null, 'text': "None" })
    })
  }
  close(res?) {
    this.modalCtrl.dismiss(res);
  }
  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('')
  }
  selectChange(e) {
    console.log('eeeee', e)
  }
  addressChanged() {
    console.log
      ('in address changed')
  }

  addAddress() {
    let self = this;
    let url = "api/employees/addorupdate";
    let fgVal = this.firstFormGroup.value
    let params: AddAddressDTO = new AddAddressDTO();
    params.employeeid = localStorage.getItem('employeeId');
    let newAddress: AddressDTO = new AddressDTO();
    newAddress.AddressType = fgVal.addressType;
    newAddress.City = fgVal.city;
    newAddress.Mobile = fgVal.mobile;
    newAddress.State = fgVal.state;
    newAddress.StreetName = fgVal.streetName;
    newAddress.UnitStreetNo = fgVal.streetNo;
    newAddress.id = uuid()
    params.address.push(newAddress)
    console.log('fgballll', fgVal)
    let addObs = this.service.addAddress(url, params);
    addObs.subscribe(res => {
      console.log('resss', res);
      self.firstFormGroup.reset();
      self.addNewAddress = false;
      self.getAddressList();
    }, err => {
      console.log('errr', err)
    })
  }
  ngAfterViewInit() {
    //  this.formControl.setValue(2)
    this.calc();
  }

  calc() {
    console.log('in calculatioin fn')
    setTimeout(() => {
      this.stars = [];
      let tmp = this.secondFormGroup.value.rating;
      for (let i = 0; i < this.numStars; i++ , tmp--)
        if (tmp >= 1)
          this.stars.push("star");
        else if (tmp < 1 && tmp > 0)
          this.stars.push("star-half");
        else
          this
            .stars
            .push("star-outline");
    }, 0);
  }

  starClicked(index) {
    let fg = this.secondFormGroup
    fg.value.rating = index + 1;
    this.calc();
    console.log('fggggg', fg)
  }

  finaliseGifts() {
    let self = this;
    let data = this.navParams.data;
    let secondFgVal = self.secondFormGroup.value
    let filteringObj = {
      "Birthdays": 'birthdaygiftselection',
      "Celebrations": 'festivalgiftselection',
      "Delightball": 'giftselection',
      "Ranking System": 'giftselection',
      "Evaluation System": 'giftselection'
    }
    let url = 'api/emptransactions/' + filteringObj[data.delight.planid];
    let orderUrl: string = 'api/orders/order';
    let orderParams: any = {};
    let params: any = {};
    params.organizationid = localStorage.getItem('organizationid');
    params.employeeid = localStorage.getItem('employeeId');
    params.groupid = data.delight.groupid;
    params.rating = secondFgVal.rating;
    let giftObj = {};
    giftObj['giftid'] = data.gift._id;
    giftObj['giftname'] = data.gift.giftname;
    giftObj['giftvalue'] = data.gift.giftvalue;
    data.category.categorydetails.map(x => {
      x.buckets.map(bucket => {
        if (data.delight.bucketname == '0') {
          data.delight.bucketname = 'XSmall'
        }
        if (bucket.bucketname == data.delight.bucketname) {
          giftObj['bucketid'] = bucket.bucketid;
          giftObj['bucketvalue'] = bucket.bucketvalue
        }
      })
    })
    params.giftsselected = [giftObj];
    console.log('paramssss', params, 'fggg', this.firstFormGroup)
    orderParams['ordernumber'] = uuid();
    orderParams['organizationid'] = localStorage.getItem('organizationid');
    orderParams['organizationname'] = localStorage.getItem('organizationname');
    orderParams['groupid'] = data.delight.groupid;
    orderParams['groupname'] = data.delight.groupname;
    orderParams['employeeid'] = localStorage.getItem('employeeId');
    orderParams['email'] = localStorage.getItem('emailid');
    orderParams['employeename'] = localStorage.getItem('userfirstname') + ' ' + localStorage.getItem('userlastname');
    orderParams['department'] = localStorage.getItem('department');
    orderParams['designation'] = localStorage.getItem('designation');
    orderParams['dateofjoining'] = localStorage.getItem('dateofjoining');
    orderParams['dateofbirth'] = localStorage.getItem('dateofbirth');
    orderParams['deliveryaddress'] = self.addressList[self.firstFormGroup.value.address];
    orderParams['giftname'] = data.gift.giftname;
    orderParams['actualvalue'] = giftObj['bucketvalue'];
    orderParams['selectedvalue'] = data.gift.giftvalue;
    orderParams['rating'] = secondFgVal.rating;
    orderParams['notes'] = secondFgVal.message;
    console.log('orderrParamss', orderParams);

    let finalGiftsObs = self.service.finaliseGifts(url, params)
    finalGiftsObs.subscribe(res => {
      console.log('ress', res)
      self.service.finaliseOrder(orderUrl, orderParams).subscribe(resp => {
        console.log('ressppp', resp)
        self.openAlert(resp)
      }, error => {
        console.log('errorrrr', error)
      })
    }, err => {
      console.log('errr', err)
    })
    console.log('in finalise gifts', url)
  }

  async openAlert(res) {
    let self = this;
    let alert = await this.alertctrl.create({
      header: 'Success', message: res.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          self.close({ data: 'Order Finalised' })
        }
      }]
    })
    alert.present();
  }

}