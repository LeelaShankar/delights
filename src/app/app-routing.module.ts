import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'tab', loadChildren: "./tabs/tabs.module#TabsPageModule"
  },
  { path: 'temp-password', loadChildren: './temp-password/temp-password.module#TempPasswordPageModule' },
  { path: 'view-delights', loadChildren: './view-delights/view-delights.module#ViewDelightsPageModule' },
  { path: 'view-gifts', loadChildren: './view-gifts/view-gifts.module#ViewGiftsPageModule' },
  { path: 'gift-selection', loadChildren: './gift-selection/gift-selection.module#GiftSelectionPageModule' },
  { path: 'view-profile', loadChildren: './view-profile/view-profile.module#ViewProfilePageModule' },
  { path: 'manage-address', loadChildren: './manage-address/manage-address.module#ManageAddressPageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'add-new-address', loadChildren: './add-new-address/add-new-address.module#AddNewAddressPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
