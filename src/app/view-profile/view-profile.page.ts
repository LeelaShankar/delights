import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  firstName: string;
  lastName: string;
  organisationName: string;
  designation: string;
  dateOfJoining: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.firstName = localStorage.getItem('userfirstname');
    this.lastName = localStorage.getItem('userlastname');
    this.organisationName = localStorage.getItem('organizationname');
    this.designation = localStorage.getItem('designation');
    this.dateOfJoining = localStorage.getItem('dateofjoining');
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('')
  }

  close() {
    this.modalCtrl.dismiss()
  }

}
