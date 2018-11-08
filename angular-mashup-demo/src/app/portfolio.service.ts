import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Stock} from "./stock";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient, private jwtService : JwtService) { }

  getPositionsURL(portfolioId: string) : string {
    //var URL = `/investment-management/portfolios/${portfolioId}/positions`;
    var URL = '/testbed' + `/investment-management/portfolios/${portfolioId}/positions`

    return URL
  }

  // getPositionsForOld(key) {
  //   var obs = <Observable<any>> this.http.get(this.exampleURL);
  //   return obs.pipe(map(data => data.filter(asset => asset['assetType'] == 'shab')))
  // }

  getPositionsFor(portfolioId) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
    })
    const params = new HttpParams();
      //.set('isin', assetIsin);

    console.log("URL: " + this.getPositionsURL(portfolioId));

    var obs = <Observable<any>> this.http.get(this.getPositionsURL(portfolioId), {headers: headers, params: params});
    return obs.pipe(map(data => data.filter(asset => asset['assetType'] == 'shab')))
  }
}
