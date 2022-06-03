import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TradesComponent } from './pages/trades/trades.component';
import { TradeComponent } from './pages/trades/trade/trade.component';
import { ChartComponent } from './pages/trades/chart/chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        TradesComponent,
        TradeComponent,
        ChartComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgChartsModule,
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
