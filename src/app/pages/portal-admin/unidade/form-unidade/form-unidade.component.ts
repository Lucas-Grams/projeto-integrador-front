import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";

@Component({
   selector: 'pnip-admin-form-unidade',
   templateUrl: './form-unidade.component.html',
   styleUrls: [],
})
export class FormUnidadeComponent {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-admin',
         home: true
      },
      {
         label: 'Unidades',
         url: '/portal-admin/unidades'
      },
      {
         label: 'Cadastrar nova unidade',
         active: true
      }
   ];

   public formGroup: FormGroup;

   constructor(private loadingService: LoadingService, private router: Router, private fb: FormBuilder) {
      this.formGroup = this.fb.group({
         nome: [null, Validators.required],
         tipo: [null, Validators.required],
         idUnidadeGerenciadora: [null, Validators.required],
         cep: [null, Validators.required],
         rua: [null, Validators.required],
         numero: [null],
         bairro: [null],
         complemento: [null],
         cidade: [null, Validators.required],
         uf: [null, Validators.required],
         latitude: [null, Validators.required],
         longitude: [null, Validators.required]
      });
   }

   salvar() {
      this.loadingService.show = true;
      setTimeout(() => {
         this.loadingService.show = false;
         this.router.navigate(['/portal-admin/unidades']);
      }, 1200);
      console.log({...this.formGroup.value});
   }

}
