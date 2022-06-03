import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class FormatDateService {
    
    constructor(
        private datePipe: DatePipe
    ) {}
    
    formatDate(date: Date): string | null {
        return this.datePipe.transform(date, 'dd.MM.YYYY');
    }
    
    switchDate(date: string): string {
        return `${date.slice(3, 5)}.${date.slice(0, 2)}.${date.slice(-4)}`;
    }
}