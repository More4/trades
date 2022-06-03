import { Component, OnInit } from '@angular/core';
import { Trade } from '../../core/models/trade-model';
import { TradesService } from '../../core/services/trades.service';
import { SortedTrade } from '../../core/models/sorted-trade-model';
import { FormatDateService } from '../../core/services/format-date.service';

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
                entryDate: new Date('03.20.1989'),
                entryPrice: 100,
                exitDate: new Date('03.21.1989'),
                exitPrice: 140,
            }
        },
        {
            base: {
                entryDate: new Date('03.22.1989'),
                entryPrice: 75,
                exitDate: new Date('03.23.1989'),
                exitPrice: 50,
            }
        },
        {
            base: {
                entryDate: new Date('03.24.1989'),
                entryPrice: 1100,
                exitDate: new Date('03.25.1989'),
                exitPrice: 1250,
            }
        },
        {
            base: {
                entryDate: new Date('03.26.1989'),
                entryPrice: 300,
                exitDate: new Date('03.27.1989'),
                exitPrice: 275,
            }
        },
        {
            base: {
                entryDate: new Date('03.28.1989'),
                entryPrice: 185,
                exitDate: new Date('03.29.1989'),
                exitPrice: 294,
            }
        },
        {
            base: {
                entryDate: new Date('03.30.1989'),
                entryPrice: 83,
                exitDate: new Date('03.31.1989'),
                exitPrice: 40,
            }
        },
        {
            base: {
                entryDate: new Date('04.01.1989'),
                entryPrice: 500,
                exitDate: new Date('04.02.1989'),
                exitPrice: 800,
            }
        },
    ];
    sortedTrades: SortedTrade[] = [];
    points: number[] = [];
    dateLabels: string[] = [];

    private startBalance = 2000;

    constructor(
        private tradesService: TradesService,
        private formatDateService: FormatDateService,
    ) {}

    ngOnInit(): void {
        this.generateSettingsForChart();
    }
    
    private generateSettingsForChart(): void {
        let currentBalance = this.startBalance;
        this.sortedTrades = this.tradesService.sortTrades(this.tradesList);
        for (const item of this.sortedTrades) {
            item.type === 'entry' ? currentBalance -= item.price : currentBalance += item.price;
            this.points.push(currentBalance);
            this.dateLabels.push(this.formatDateService.formatDate(item.date) || '');
        }
    }

    updateTradesData(trade: Trade, index: number): void {
        this.points = [];
        this.dateLabels = [];
        this.tradesList[index] = {...trade};
        this.generateSettingsForChart();
    }

    addNewEntry(): void {
        this.tradesList.push({
            base: {
                entryDate: new Date(),
                entryPrice: 0,
                exitDate: new Date(),
                exitPrice: 0,
            },
            created: true,
        });
    }
}
