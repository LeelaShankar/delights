import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TempPasswordPage } from './temp-password.page';

const routes: Routes = [
  {
    path: '',
    component: TempPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [TempPasswordPage]
})
export class TempPasswordPageModule { }
