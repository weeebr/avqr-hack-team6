import {Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Stock} from '../stock';
import {StockService} from '../stock.service';


@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {


  private _asset;
  private stock:Stock;
  private stockClass:String;

  get asset():any {
    return this._asset;
  }

  @Input()
  set asset(val:any) {
    this._asset = val;
    this.getStockDetails(this._asset.assetIsin);
  }

  constructor(private stockService:StockService, private http:HttpClient) {
    this.stock = null;
    this.stockClass = 'info';
  }

  ngOnInit() {
  }

  getStockDetails(assetIsin):void {
    this.stockService.getStockDetailsFor(assetIsin)
    //this.restItemsServiceGetRestItems(assetIsin)
      .subscribe(
        stock => {
          this.stock = stock;
          if (stock !== null && stock.changePercent < 0)
            this.stockClass = 'danger';
        }
      )
  }


}
