import { Injectable } from '@angular/core';
import { Trade } from '../models/trade-model';
import { DateConvertService } from './date-convert.service';

@Injectable({
    providedIn: 'root',
})
export class TradesService {

    constructor(
        private convertDates: DateConvertService,
    ) {}

    updateTrades(tradesList: Trade[], newTrades?: Trade[]): Trade[] {
        const mergedTrades = newTrades ? tradesList.concat(newTrades) : tradesList;
        for (let i = 0, endI = mergedTrades.length - 1; i < endI; i++) {
            let swapped = false;
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                if (this.convertDates.convertDateToSeconds(mergedTrades[j].exitDate) >
                    this.convertDates.convertDateToSeconds(mergedTrades[j + 1].exitDate)) {
                    [mergedTrades[j], mergedTrades[j + 1]] = [mergedTrades[j + 1], mergedTrades[j]];
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        return mergedTrades;
    }
}