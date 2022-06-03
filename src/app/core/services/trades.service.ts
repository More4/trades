import { Injectable } from '@angular/core';
import { Trade } from '../models/trade-model';
import { SortedTrade } from '../models/sorted-trade-model';

@Injectable({
    providedIn: 'root',
})
export class TradesService {

    constructor() {}
    
    sortTrades(tradesList: Trade[]): SortedTrade[] {
        let mergedTrades: SortedTrade[] = [];
        for (const trade of tradesList) {
            mergedTrades.push({
                date: trade.base.entryDate,
                price: trade.base.entryPrice,
                type: 'entry',
            });
            mergedTrades.push({
                date: trade.base.exitDate,
                price: trade.base.exitPrice,
                type: 'exit',
            });
        }
        return mergedTrades.sort((a, b) => a.date.valueOf() - b.date.valueOf());
    }
}