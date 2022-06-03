import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Trade } from '../../../core/models/trade-model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { priceValidator } from '../../../core/validators/price.directive';
import { dateFormatValidator } from '../../../core/validators/date-format.directive';
import { dateDifferenceValidator } from '../../../core/validators/date-difference.directive';
import { PriceService } from '../../../core/services/price.service';

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.scss'],
})

export class TradeComponent implements OnInit, OnChanges {
    @Input() tradeData!: Trade;
    @Input() index!: number;
    @Output('tradesDataUpdated') updateTradesData = new EventEmitter<Trade>();

    tradeForm = this.fb.group({
        entryDate: ['', [Validators.required, dateFormatValidator()]],
        entryPrice: ['', [Validators.required, priceValidator()]],
        exitDate: ['', [Validators.required, dateFormatValidator()]],
        exitPrice: ['', [Validators.required, priceValidator()]],
    }, {
        validators: dateDifferenceValidator
    })

    profit!: number;
    editAllowed: boolean = false;
    priceErrorMessage: string = 'invalid price value';
    dateFormatErrorMessage: string = 'invalid date format';
    entryDateErrorMessage: string = 'entry date must be less than exit date';
    exitDateErrorMessage: string = 'exit date must be greater than entry date';

    updatedTrade!: Trade;

    constructor(
        private fb: FormBuilder,
        private priceService: PriceService
    ) {}

    ngOnInit(): void {
        this.tradeForm.patchValue({
            entryDate: this.tradeData.base.entryDate,
            entryPrice: this.tradeData.base.entryPrice,
            exitDate: this.tradeData.base.exitDate,
            exitPrice: this.tradeData.base.exitPrice,
        })
        this.profit = this.priceService.updatePrice(this.tradeForm);
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes['tradeData']?.currentValue.created) {
            this.editTradeData();
        }
    }
    
    get(control: string): AbstractControl | null {
        if (!control) {
            return null;
        }
        return this.tradeForm.controls[control];
    }

    editTradeData(): void {
        this.editAllowed = true;
    }

    saveTradeData(): void {
        this.tradeForm.markAllAsTouched();
        if (!this.tradeForm.valid) {
            return;
        }
        this.profit = this.priceService.updatePrice(this.tradeForm);
        this.updatedTrade = {base: {...this.tradeForm.getRawValue()}, index: this.index};
        this.updateTradesData.emit(this.updatedTrade);
        this.editAllowed = false;
    }
}
