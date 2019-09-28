import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'tab', loadChildren: "./tabs/tabs.module#TabsPageModule"
  },
  { path: 'temp-password', loadChildren: './temp-password/temp-password.module#TempPasswordPageModule' },
  { path: 'view-delights', loadChildren: './view-delights/view-delights.module#ViewDelightsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
