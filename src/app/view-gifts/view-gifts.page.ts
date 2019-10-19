import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { WebServiceService } from '../web-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GiftSelectionPage } from '../gift-selection/gift-selection.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-view-gifts',
  templateUrl: './view-gifts.page.html',
  styleUrls: ['./view-gifts.page.scss'],
})
export class ViewGiftsPage implements OnInit {
  giftSubcategories: Array<any> = [];
  locationCategories: Array<any> = [];
  gifts: Array<any> = [];
  location: string;
  category: string;
  filterForm: FormGroup = new FormGroup({
    'category': new FormControl(),
    'location': new FormControl()
  })
  giftsFiltered: Array<any> = [];
  constructor(public navParams: NavParams, public navCtrl: NavController, public service: WebServiceService, public modalCtrl: ModalController,
    public photoViewer: PhotoViewer) {
    let self = this;
    let locationParams: any = {
      "supercategoryname": "Location"
    }
    let giftCategoryParams: any = {
      "supercategoryname": 'Gift Category'
    }
    let locObs = this.service.getSubcategory(locationParams)
    let categoryObs = this.service.getSubcategory(giftCategoryParams)
    categoryObs.subscribe(res => {
      self.giftSubcategories = res.subcategories;
      self.giftSubcategories.unshift({ "subcategoryname": 'All' })
    })
    locObs.subscribe(resp => {
      self.locationCategories = resp.subcategories;
      self.locationCategories.unshift({ "subcategoryname": 'All' })
    })
  }

  ngOnInit() {
    let self = this;
    let data = this.navParams.data;
    let selectedDelight: any = data.delight
    console.log('groupsss', data.delight)
    console.log('categoriesss', data.category)
    let giftType: string = '';
    let filteringBucketObj = {
      "Large": "bucketlargegifts",
      "Medium": "bucketmediumgifts",
      "Small": "bukcetsmallgifts",
      "XSmall": "bucketxsmallgifts",
      "0": "bucketxsmallgifts",
    }

    let filteringObj = {
      "Birthdays": 'bucketxsmallgifts',
      "Celebrations": 'bucketxsmallgifts',
      "Delightball": filteringBucketObj[selectedDelight.bucketname],
      "Ranking System": filteringBucketObj[selectedDelight.bucketname],
      "Evaluation System": filteringBucketObj[selectedDelight.bucketname]
    }
    giftType = filteringObj[selectedDelight.planid]
    self.gifts = data.category[giftType];
    self.giftsFiltered = self.giftsFiltered.concat(self.gifts)
    console.log('giftType', giftType, 'giftss', self.gifts);
    let url = 'api/employees/' + localStorage.getItem('employeeId')
    this.service.getUserDetails(url).subscribe(res => {
      console.log('resss', res);
      localStorage.setItem('department', res.userdetails[0].department);
      localStorage.setItem('dateofbirth', res.userdetails[0].dateofbirth)
    })
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('')
  }

  close(res?) {
    console.log('in closeee')
    this.modalCtrl.dismiss(res)
  }

  filterGifts(val) {
    let fgVal = this.filterForm.value
    if (fgVal.category) {
      this.giftsFiltered = this.gifts.filter(x => x.type == fgVal.category)
      if (fgVal.category == 'All') {
        this.giftsFiltered = this.giftsFiltered.concat(this.gifts)
      }
    }
    if (fgVal.location) {
      this.giftsFiltered = this.gifts.filter(x => x.location == fgVal.location);
      if (fgVal.location == 'All') {
        this.giftsFiltered = this.giftsFiltered.concat(this.gifts)
      }
    }
    this.giftsFiltered = this.giftsFiltered.concat(this.gifts.filter(x => x.location == 'All'))
  }

  selectGifts(gift) {
    console.log('in select Gofts');
    this.openGifts(gift);
  }

  async openGifts(gift) {
    let self = this;
    let data = this.navParams.data;
    let modal = await this.modalCtrl.create({
      component: GiftSelectionPage,
      componentProps: {
        delight: data.delight,
        category: data.category, gift: gift
      }
    })

    modal.onDidDismiss().then(x => {
      console.log('xxxx', x)
      setTimeout(() => {
        console.log('self', self)
        if (x.data && x.data.data == 'Order Finalised') self.close(x);
      }, 50)
    })
    return await modal.present();
  }

  openImage(gift) {
    let imagePath = gift.giftimagepath.replace(/ /g, '%20')
    this.photoViewer.show(imagePath, gift.giftname, { copyToReference: true });
  }

}
