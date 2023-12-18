import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HabilitarTRDTO} from "../../../../../core/dtos/habilitar-tr.dto";
import {CepService} from "../../../../../core/services/cep.service";
import {cpfValidator} from "../../../../../utils/validators/cpf.validator";
import {cepValidator} from "../../../../../utils/validators/cep.validator";
import {Router} from "@angular/router";

@Component({
   selector: 'pnip-tr-form-dados-pessoais',
   templateUrl: './dados-pessoais.component.html',
   styleUrls: ['../form-solicitar-acesso.component.css'],
   providers: [CepService]
})
export class DadosPessoaisComponent implements OnInit {

   public formGroup!: FormGroup;

   @Input() dto!: HabilitarTRDTO;
   @Output() onSaveStep = new EventEmitter<any>();

   constructor(private fb: FormBuilder, private cepService: CepService, private router: Router) {}

   ngOnInit() {
      this.formGroup = this.fb.group({
         nome: [this.dto?.nome, [Validators.required, Validators.maxLength(100)]],
         cpf: [this.dto?.cpf, [Validators.required, cpfValidator()]],
         email: [this.dto?.email, [Validators.required, Validators.email, Validators.maxLength(70)]],
         telefone: [this.dto?.telefone],
         cep: [this.dto?.cep, [Validators.required, cepValidator()]],
         logradouro: [this.dto?.logradouro],
         numero: [this.dto?.numero],
         complemento: [this.dto?.complemento],
         municipio: [this.dto?.municipio],
         uf: [this.dto?.uf]
      });
   }

   getAddressByCep() {
      const field = this.formGroup.get('cep');
      if (!field?.value) return;
      const cep = field?.value[0];
      if (cep.length === 9) {
         this.cepService.getAddrress(cep).subscribe(response => {
            if (response && !response.erro) {
               this.formGroup.get('logradouro')?.setValue(response.logradouro);
               this.formGroup.get('municipio')?.setValue(response.localidade);
               this.formGroup.get('uf')?.setValue(response.uf);
            }
         });
      }
   }

   submit(goToStep = false) {
      if (this.formGroup.valid) {
         const form: HabilitarTRDTO = <HabilitarTRDTO>{...this.formGroup.value};
         for (let attr in form) {
            // @ts-ignore
            this.dto[attr] = form[attr];
         }
         if (!goToStep) this.onSaveStep.emit();
         return true;
      } else {
         this.formGroup.markAllAsTouched();
      }
      return false;
   }

   voltar() {
      this.router.navigate(['/portal-tr/primeiro-acesso']);
   }

}
