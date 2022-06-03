import { Component, OnInit } from '@angular/core';
import { Trade } from '../../core/models/trade-model';
import { TradesService } from '../../core/services/trades.service';

@Component({
    selector: 'app-trades',
    templateUrl: './trades.component.html',
    styleUrls: ['./trades.component.scss'],
})

export class TradesComponent implements OnInit {
    columns = ['Entry date', 'Entry price', 'Exit date', 'Exit price', 'Profit'];
    tradesList: Trade[] = [
        {
            base: {
                entryDate: '20.03.1989',
                entryPrice: 100,
                exitDate: '21.03.1989',
                exitPrice: 140,
            }
        },
        {
            base: {
                entryDate: '22.03.1989',
                entryPrice: 75,
                exitDate: '23.03.1989',
                exitPrice: 50,
            }
        },
        {
            base: {
                entryDate: '24.03.1989',
                entryPrice: 1100,
                exitDate: '25.03.1989',
                exitPrice: 1250,
            }
        },
        {
            base: {
                entryDate: '26.03.1989',
                entryPrice: 300,
                exitDate: '27.03.1989',
                exitPrice: 275,
            }
        },
        {
            base: {
                entryDate: '28.03.1989',
                entryPrice: 185,
                exitDate: '29.03.1989',
                exitPrice: 294,
            }
        },
        {
            base: {
                entryDate: '29.03.1989',
                entryPrice: 83,
                exitDate: '29.03.1989',
                exitPrice: 40,
            }
        },
        {
            base: {
                entryDate: '31.03.1989',
                entryPrice: 500,
                exitDate: '01.04.1989',
                exitPrice: 800,
            }
        },
    ];
    dateLabels: string[] = [];
    points: number[] = [];

    private startBalance = 1000;

    constructor(
        private tradesService: TradesService,
    ) {}

    ngOnInit(): void {
        this.initTradesData();
    }
    
    initTradesData(): void {
        let currentBalance = this.startBalance;
        this.updateChartSettings(currentBalance);
    }

    updateTradesData(trade: Trade, index: number): void {
        let currentBalance = this.startBalance;
        this.points = [];
        this.dateLabels = [];
        this.tradesList[index] = {...trade};
        this.tradesList = this.tradesService.updateTrades(this.tradesList);
        this.updateChartSettings(currentBalance);
    }
    
    updateChartSettings(currentBalance: number): void {
        for (let item of this.tradesList) {
            const dailyBalanceResult = currentBalance + (item.base.exitPrice - item.base.entryPrice);
            currentBalance = dailyBalanceResult;
            this.points.push(dailyBalanceResult);
            this.dateLabels.push(item.base.exitDate);
        }
    }

    addNewEntry(): void {
        this.tradesList.push({
            base: {
                entryDate: '',
                entryPrice: 0,
                exitDate: '',
                exitPrice: 0,
            },
            created: true,
        });
    }
}
