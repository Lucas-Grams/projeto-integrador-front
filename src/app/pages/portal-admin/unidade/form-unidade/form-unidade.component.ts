import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";
import {Unidade} from "../../../../core/models/unidade.model";
import {UnidadeService} from "../../../../core/services/unidade.service";



declare var swal: any;
@Component({
   selector: 'pnip-admin-form-unidade',
   templateUrl: './form-unidade.component.html',
   styleUrls: [],
})
export class FormUnidadeComponent implements OnInit{

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
   unidade: Unidade;

   validar: boolean = false;

   tipoUnidade = [
      {id: 1, value: 'Unidade Central (UC)'},
      {id: 2, value: 'Programa/Seção (PS)'},
      {id: 3, value: 'Supeorvisão Regional (SR)'},
      {id: 4, value: 'Inspetoria Vetrinária Local (IVZ)'}
   ]

   constructor(private loadingService: LoadingService,
               private router: Router,
               private fb: FormBuilder,
               private unidadeService: UnidadeService) {
      this.unidade = new Unidade();
      this.formGroup = this.fb.group({
         nome: this.fb.control(this.unidade.nome, [Validators.minLength(2), Validators.maxLength(100), Validators.required]),
         tipo: this.fb.control(this.unidade.tipo, [Validators.minLength(2), Validators.required]),
         idUnidadeGerenciadora: this.fb.control(this.unidade.idUnidadeGerenciadora, [Validators.required]),
         cep: this.fb.control(this.unidade.endereco.cep, [Validators.minLength(8), Validators.maxLength(8), Validators.required]),
         rua: this.fb.control( this.unidade.endereco.rua, [Validators.minLength(2),Validators.maxLength(70), Validators.required]),
         numero: this.fb.control(this.unidade.endereco.numero, [ Validators.minLength(1)]),
         bairro: this.fb.control(this.unidade.endereco.bairro, [Validators.minLength(2), Validators.maxLength(50)]),
         complemento: this.fb.control(this.unidade.endereco.complemento, [Validators.minLength(2), Validators.maxLength(50)]),
         cidade: this.fb.control(this.unidade.endereco.cidade, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
         uf: this.fb.control(this.unidade.endereco.uf, [Validators.minLength(2), Validators.maxLength(2), Validators.required]),
         latitude: this.fb.control( this.unidade.endereco.latitude, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
         longitude: this.fb.control( this.unidade.endereco.longitude, [Validators.minLength(2), Validators.maxLength(50), Validators.required])
      });
   }

   ngOnInit() {

   }

   salvar() {
      this.loadingService.show = true;
      this.unidade = this.formGroup.value;
      console.log(this.unidade);
      this.unidadeService.salvar(this.unidade).subscribe(mensagem => {
         swal.fire(mensagem.msg).then();
      });
      setTimeout(() => {
         this.loadingService.show = false;
         this.router.navigate(['/portal-admin/unidades']);
      }, 1200);
      console.log({...this.formGroup.value});
   }

}
