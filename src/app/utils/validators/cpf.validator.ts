import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function cpfValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (control.value && !cpfRegex.test(control.value)) {
         return {'cpf': true};
      }
      return null;
   };
}
