import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        const isGreaterThanZero = value >= 0;
        const isNumeric = /[0-9]+/.test(value);

        const priceValid = isGreaterThanZero && isNumeric;

        return !priceValid ? { priceError: true }: null;
    }
}