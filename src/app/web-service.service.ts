import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginReqDTO } from './Interfaces/loginReqDTO';
import { Observable } from 'rxjs';
import { LoginRespDTO } from './Interfaces/loginRespDTO';
import { ResetPwdReqDTO } from './Interfaces/ResetPwdReqDTO';
import { ViewDelightsDTO } from './Interfaces/ViewDelightsDTO';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  serviceUrl: string = 'https://testmidware.delights.tech:3000/';

  constructor(public http: HttpClient) { }

  employeeLogin(url: string, params: LoginReqDTO): Observable<LoginRespDTO> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.post<LoginRespDTO>(obsoluteUrl, params)
  }

  resetPwd(url: string, params: ResetPwdReqDTO): Observable<LoginRespDTO> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.post<LoginRespDTO>(obsoluteUrl, params)
  }

  viewMyDelights(url: string, params: ViewDelightsDTO): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.post<any>(obsoluteUrl, params)
  }

  getGiftsGroup(url: string): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.get<any>(obsoluteUrl)
  }

  getGiftsCategory(url: string): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.get<any>(obsoluteUrl)
  }

  getSubcategory(params: any): Observable<any> {
    let url = this.serviceUrl + 'api/subcategories/category';
    return this.http.post<any>(url, params)
  }

  getGiftsHistory(url: string, params: any): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.post<any>(obsoluteUrl, params)
  }

  getAddress(url: string): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.get<any>(obsoluteUrl)
  }

  addAddress(url: string, params: any): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.post<any>(obsoluteUrl, params)
  }

  finaliseGifts(url: string, params: any): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.patch<any>(obsoluteUrl, params);
  }

  finaliseOrder(url, params): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    console.log('obsoluteeee', obsoluteUrl)
    return this.http.post<any>(obsoluteUrl, params)
  }

  getUserDetails(url): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.get(obsoluteUrl)
  }

  deleteAddress(url, params): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.post(obsoluteUrl, params)
  }

  changePassword(url, params): Observable<any> {
    let obsoluteUrl = this.serviceUrl + url;
    return this.http.post(obsoluteUrl, params)
  }
}
