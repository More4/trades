import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class PriceService {

    constructor() {}

    updatePrice(form: FormGroup): number {
        return form.get('exitPrice')?.value - form.get('entryPrice')?.value;
    }
}