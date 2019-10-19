import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { MatStepperModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewGiftsPage } from './view-gifts/view-gifts.page';
import { ViewDelightsPage } from './view-delights/view-delights.page';
import { GiftSelectionPage } from './gift-selection/gift-selection.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ViewProfilePage } from './view-profile/view-profile.page';
import { ChangePasswordPage } from './change-password/change-password.page';
import { ManageAddressPage } from './manage-address/manage-address.page';
import { AddNewAddressPage } from './add-new-address/add-new-address.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  declarations: [AppComponent, ViewGiftsPage, ViewDelightsPage, GiftSelectionPage,
    ViewProfilePage, ChangePasswordPage, ManageAddressPage, AddNewAddressPage],
  entryComponents: [ViewGiftsPage, ViewDelightsPage, GiftSelectionPage,
    ViewProfilePage, ChangePasswordPage, ManageAddressPage, AddNewAddressPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule, FormsModule,
    BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
