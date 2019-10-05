import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewDelightsPage } from './view-delights.page';
import { ViewGiftsPage } from '../view-gifts/view-gifts.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDelightsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewDelightsPage, ViewGiftsPage],
  entryComponents: [ViewGiftsPage]
})
export class ViewDelightsPageModule { }
