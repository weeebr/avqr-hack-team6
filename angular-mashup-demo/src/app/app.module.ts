import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    StockDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
