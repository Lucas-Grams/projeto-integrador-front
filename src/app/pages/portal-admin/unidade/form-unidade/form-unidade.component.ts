import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";
import {Unidade} from "../../../../core/models/unidade.model";
import {UnidadeService} from "../../../../core/services/unidade.service";
import { ToastrService } from "ngx-toastr";
import {CepService} from "../../../../core/services/cep.service";
import {cpfValidator} from "../../../../utils/validators/cpf.validator";
import {cepValidator} from "../../../../utils/validators/cep.validator";
import {ValidatorsFormsUtils} from "../../../../utils/components/validators-forms.utils";


declare var swal: any;
@Component({
   selector: 'pnip-admin-form-unidade',
   templateUrl: './form-unidade.component.html',
   styleUrls: [],
   providers:[CepService]
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
   unidadesGerenciadoras: Unidade[] = [];

   validarUc: boolean = false;

   tipoUnidade = [
      {id: 1, value: 'Unidade Central (UC)', item: 'UC'},
      {id: 2, value: 'Programa/Seção (PS)', item: 'PS'},
      {id: 3, value: 'Supeorvisão Regional (SR)', item: 'SR'},
      {id: 4, value: 'Inspetoria Vetrinária Local (IVZ)', item: 'IVZ'},
      {id: 5, value: 'Ministério da Pesca e Aquicultura (MPA)', item: 'MPA'},
      {id: 6, value: 'Secretaria Nacional (SN)', item: 'SN'},
      {id: 7, value: 'Departamento (DP)', item: 'DP'},
      {id: 8, value: 'Superintendencia Federal da Pesca (SFP)', item: 'SFP'}
   ]


   constructor(private loadingService: LoadingService,
               private router: Router,
               private fb: FormBuilder,
               private unidadeService: UnidadeService,
               private cepService: CepService,
               private toast: ToastrService) {
      this.unidade = new Unidade();
      this.formGroup = this.fb.group({
         nome: this.fb.control(this.unidade.nome, [Validators.minLength(2), Validators.maxLength(100), Validators.required]),
         tipo: this.fb.control(this.unidade.tipo, [Validators.minLength(2), Validators.required]),
         idUnidadeGerenciadora: this.fb.control(this.unidade.idUnidadeGerenciadora, [Validators.required]),
         cep: this.fb.control(this.unidade.endereco.cep, [ Validators.required, Validators.minLength(8), Validators.maxLength(10) ]),
         rua: this.fb.control( this.unidade.endereco.rua, [Validators.minLength(2),Validators.maxLength(70), Validators.required]),
         numero: this.fb.control(this.unidade.endereco.numero, [ Validators.minLength(1), Validators.required]),
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


   selecionaGerenciadora() {
      switch(this.formGroup.get("tipo")?.value){
         case 'PS':
            this.validarUc = false;
            this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
               this.unidadesGerenciadoras = data;
            })
            break;
         case 'SR':
            this.validarUc = false;
            this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
               this.unidadesGerenciadoras = data;
            })
            break;
         case 'IVZ':
            this.validarUc = false;
            this.unidadeService.getGerenciadoras("SR").subscribe((data) => {
               this.unidadesGerenciadoras = data;
            })
            break;
         case 'SN':
            this.validarUc = false;
            this.unidadeService.getGerenciadoras("MPA").subscribe((data) => {
               this.unidadesGerenciadoras = data;
            })
            break;
         case 'DP':
            this.validarUc = false;
            this.unidadeService.getGerenciadoras("SN").subscribe((data) => {
               this.unidadesGerenciadoras = data;
            })
            break;
         case 'SFP':
            this.validarUc = false;
            this.unidadeService.getGerenciadoras("MPA").subscribe((data) => {
               this.unidadesGerenciadoras = data;
            })
            break;
         default:
            this.validarUc = true;
            break;
      }
   }


   validaCEP() {
      const field = this.formGroup.get('cep');
      if (!field?.value) return;
      const cep = field?.value[0];
      if (cep.length === 9) {
         this.cepService.getAddrress(cep).subscribe(response => {
            if (response && !response.erro) {
               this.formGroup.get('rua')?.setValue(response.logradouro);
               this.formGroup.get('cidade')?.setValue(response.localidade);
               this.formGroup.get('uf')?.setValue(response.uf);
            }
         });
      }

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
   }


}
