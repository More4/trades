import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: [ './chart.component.scss' ]
})
export class ChartComponent implements OnInit, OnChanges {
    @Input() dates!: string[];
    @Input() balancePoints!: number[];
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    public lineChartData!: ChartConfiguration['data'];
    public lineChartOptions: ChartConfiguration['options'];
    public lineChartType!: ChartType;

    ngOnInit(): void {
        this.lineChartType = 'line';
        this.lineChartOptions = {
            elements: {
                line: {
                    tension: 0
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {},
                'y-axis-0':
                    {
                        position: 'left',
                    },
                'y-axis-1': {
                    position: 'right',
                    grid: {
                        color: 'rgba(255,0,0,0.4)',
                    },
                    ticks: {
                        color: 'rgba(0,255,0,0.69)'
                    }
                }
            },
        };
        this.lineChartData = {
            datasets: [
                {
                    data: this.balancePoints,
                    label: 'PROFIT',
                    backgroundColor: 'rgba(0,97,255,0.51)',
                    borderColor: 'rgb(173,175,255)',
                    pointBackgroundColor: 'rgb(26,147,0)',
                    pointBorderColor: 'rgb(228,229,255)',
                    pointHoverBackgroundColor: 'rgb(26,147,0)',
                    pointHoverBorderColor: 'rgb(228,229,255)',
                    fill: 'origin',
                    pointHitRadius: 35,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBorderWidth: 1,
                    pointHoverBorderWidth: 3,
                },
            ],
            labels: this.dates,
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['balancePoints'] && changes['balancePoints'].previousValue) {
            this.lineChartData.datasets[0].data = changes['balancePoints'].currentValue;
        } else if (changes['dates'] && changes['dates'].previousValue) {
            this.lineChartData.labels = changes['dates'].currentValue;
        }
        this.chart?.render();
    }
}