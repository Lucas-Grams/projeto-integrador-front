import {Component, Input, TemplateRef, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
   selector: 'pnip-validators-forms-utils',
   template: `
      <ng-template #validacaoForm let-attr="attr">
         <div *ngIf="formGroup.get(attr)?.invalid && formGroup.get(attr)?.touched">
            <div class="feedback danger" role="alert">
               <i class="fas fa-times-circle" aria-hidden="true"></i>
               <span *ngIf="formGroup.get(attr)!.errors?.['required']">
                  Campo obrigatório
               </span>
               <span *ngIf="formGroup.get(attr)!.errors?.['maxlength']">
                  O campo deve ter no máximo {{formGroup.get(attr)!.errors?.['maxlength'].requiredLength}} caracteres
               </span>
               <span *ngIf="formGroup.get(attr)!.errors?.['email']">
                  Informe um email válido
               </span>
               <span *ngIf="formGroup.get(attr)!.errors?.['cpf']">
                  CPF em formato inválido.
               </span>
               <span *ngIf="formGroup.get(attr)!.errors?.['cep']">
                  CEP em formato inválido.
               </span>
            </div>
         </div>
      </ng-template>
   `,
})
export class ValidatorsFormsUtils {

   @Input() formGroup!: FormGroup;

   @ViewChild('validacaoForm', { static: true }) templateValidacao!: TemplateRef<any>;

   constructor() {}

   public getStateOfField(attr: string) {
      return (!this.formGroup || !this.formGroup.get(attr)?.touched) && !this.formGroup.get(attr)?.value ? null :
             (this.formGroup.get(attr)?.invalid ? 'danger' : (this.formGroup.get(attr)?.value ? 'success' : null));
   }

}
