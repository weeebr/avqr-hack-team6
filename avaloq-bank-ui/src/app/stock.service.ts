import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Money} from './money';
import {Stock} from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  restItemsUrl = '/shares';

  getStockDetailsFor(assetIsin) : Observable<Stock> {
    const headers = new HttpHeaders({
      'Accept': 'text/html'
    })
    const params = new HttpParams()
      .set('isin', assetIsin);

    return this.http
    // The 'text' as 'json' bit is insane, but seems to be needed to keep typescript happy
      .get<string>(this.restItemsUrl, {headers: headers, params: params, responseType: 'text' as 'json'})

      .pipe(map(data => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        const details = tempDiv.querySelector("#shares_details")
        // It's possible we won't find a stock, so stop if we can't find it.
        if (details == null) {
          return null;
        }
        const stock = new Stock();
        stock.codeNumber = parseInt(this.extractDetail(details, ".ln_wkn"))
        stock.isin = this.extractDetail(details, ".ln_isin")
        stock.symbol = this.extractDetail(details, ".ln_symbol")
        stock.sector = this.extractDetail(details, ".ln_sector")
        stock.country = this.extractDetail(details, ".ln_country")
        const last = this.extractDetails(details, ".ln_last")
        stock.last = new Money(parseFloat(last[1]), last[0]);
        const change = this.extractDetails(details, ".ln_change")
        stock.change = new Money(parseFloat(change[1]), change[0]);
        const changePercent = this.extractDetails(details, ".ln_changepercent")
        stock.changePercent = parseFloat(change[1])
        //if (stock.changePercent < 0) this.stockClass = 'danger';
        stock.date = this.extractDetail(details, ".ln_datetime")
        stock.time = this.extractDetail(details, ".ln_onlytime")
        const images = tempDiv.querySelectorAll("img")

        if (images !== null) {
          const filtered = Array.from(images).filter(img => img.getAttribute("alt") == 'Chart');
          if (filtered.length > 0) {
            stock.chartUrl = filtered[0].getAttribute("src")
          }
        }
        return stock
      }));
  }


  extractDetail(element: Element, classSelector: string) {
    const div = element.querySelector(classSelector)
    const span = div.querySelector("span")
    return span.textContent
  }

  extractDetails(element: Element, classSelector: string) {
    const div = element.querySelector(classSelector)
    const spans = Array.from(div.querySelectorAll("span"))
    return spans.map(span => span.textContent)
  }

}
