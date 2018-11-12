import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {PortfolioService} from '../portfolio.service';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private portfolioService:PortfolioService) {
  }

  @Input()
  key:string;

  assets:Observable<any>;

  ngOnInit() {
    this.assets = this.portfolioService.getPositionsFor(this.key)
  }

}
