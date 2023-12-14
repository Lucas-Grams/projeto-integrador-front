import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function cepValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const cepRegex = /^\d{5}-\d{3}$/;
      if (control.value && !cepRegex.test(control.value)) {
         return {'cep': true};
      }
      return null;
   };
}
