import {Money} from './money'

export class Stock {
  codeNumber: number;
  isin: string;
  symbol: string;
  sector: string;
  country: string;
  last: Money;
  change: Money;
  changePercent: number;
  date: string;
  time: string;
  chartUrl: string;
}
