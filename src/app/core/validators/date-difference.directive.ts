import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateDifferenceValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {

    const fromDate = form.get('entryDate')?.value;
    const toDate = form.get('exitDate')?.value;

    const fromDateModified = `${fromDate.slice(3, 5)}.${fromDate.slice(0, 2)}.${fromDate.slice(-4)}`
    const toDateModified = `${toDate.slice(3, 5)}.${toDate.slice(0, 2)}.${toDate.slice(-4)}`

    const positiveDateDifference = Date.parse(fromDateModified) <= Date.parse(toDateModified)

    return !positiveDateDifference ? { dateDifferenceError: true }: null;
}