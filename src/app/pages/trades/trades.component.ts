import { Component, OnInit } from '@angular/core';
import { Trade } from '../../core/models/trade-model';
import {TradesService} from "../../core/services/trades.service";

@Component({
    selector: 'app-trades',
    templateUrl: './trades.component.html',
    styleUrls: ['./trades.component.scss'],
})

export class TradesComponent implements OnInit {

    columns = ['Entry date', 'Entry price', 'Exit date', 'Exit price', 'Profit'];
    tradesList: Trade[] = [
        {
            entryDate: '20.03.1989',
            entryPrice: 100,
            exitDate: '21.03.1989',
            exitPrice: 140,

        },
        {
            entryDate: '22.03.1989',
            entryPrice: 75,
            exitDate: '23.03.1989',
            exitPrice: 50,
        },
        {
            entryDate: '24.03.1989',
            entryPrice: 1100,
            exitDate: '25.03.1989',
            exitPrice: 1250,
        },
        {
            entryDate: '26.03.1989',
            entryPrice: 300,
            exitDate: '27.03.1989',
            exitPrice: 275,
        },
        {
            entryDate: '28.03.1989',
            entryPrice: 185,
            exitDate: '29.03.1989',
            exitPrice: 294,
        },
        {
            entryDate: '29.03.1989',
            entryPrice: 83,
            exitDate: '29.03.1989',
            exitPrice: 40,
        },
        {
            entryDate: '31.03.1989',
            entryPrice: 500,
            exitDate: '01.04.1989',
            exitPrice: 800,
        },
    ];
    dateLabels: string[] = [];
    points: number[] = [];

    private startBalance = 1000;

    constructor(
        private tradesService: TradesService,
    ) {}

    ngOnInit(): void {
        this.updateTradesData();
    }

    updateTradesData(trade?: Trade): void {
        let currentBalance = this.startBalance;
        if (trade && trade.index) {
            this.tradesList[trade.index] = {...trade};
            this.tradesList.forEach((item: Trade) => {delete item.index});
            this.tradesList = this.tradesService.updateTrades(this.tradesList);
            this.points = [];
            for (let item of this.tradesList) {
                const dailyBalanceResult = currentBalance + (item.exitPrice - item.entryPrice);
                currentBalance = dailyBalanceResult;
                this.points.push(dailyBalanceResult);
            }
            this.dateLabels[trade.index] = trade.exitDate;
        } else {
            for (let item of this.tradesList) {
                const dailyBalanceResult = currentBalance + (item.exitPrice - item.entryPrice);
                currentBalance = dailyBalanceResult;
                this.points.push(dailyBalanceResult);
                this.dateLabels.push(item.exitDate);
            }
        }
    }

    addNewEntry() {

    }
}
