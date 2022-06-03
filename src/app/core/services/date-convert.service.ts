import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateConvertService {

    constructor() {}

    convertDateToSeconds(date: string): number {
        return Date.parse(`${date.slice(3, 5)}.${date.slice(0, 2)}.${date.slice(-4)}`)
    }
}