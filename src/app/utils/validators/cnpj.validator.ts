import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (control.value && !cnpjRegex.test(control.value)) {
            return {'cnpj': true};
        }
        return null;
    };
}
