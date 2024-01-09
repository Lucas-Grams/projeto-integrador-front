import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Unidade } from "../../../../../core/models/unidade.model";
import { UnidadeService } from "../../../../../core/services/unidade.service";
import { ToastrService } from "ngx-toastr";
import { CepService } from "../../../../../core/services/cep.service";
import { ValidatorsFormsUtils } from "../../../../../utils/components/validators-forms.utils";
import {LoadingService} from "../../../../../core/services/loading.service";
import {Usuario} from "../../../../../core/models/usuario.model";
import {UsuarioService} from "../../../../../core/services/usuario.service";
import Swal from "sweetalert2";
import {BrSelectComponent} from "../../../../../shared/br-select/br-select.component";
import {FormRepresentanteUnidadeComponent} from "../form-representante-unidade/form-representante-unidade.component";


@Component({
   selector: 'pnip-admin-form-editar-unidade',
   templateUrl: './form-editar-unidade.component.html',
   styleUrls: [],
   providers: [CepService]
})
export class FormEditarUnidadeComponent implements OnInit {

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
         label: 'Visualizar unidade',
         active: true
      }
   ];

   isEdit: boolean = false;
   public formGroup: FormGroup;
   unidade: Unidade;
   unidadesGerenciadoras: Unidade[] = [];
   uuid: string = '';

   validarUc: boolean = false;

   representantes: Usuario[] = [];

   tipoUnidade: any = [];
   unidades: any = [];
   @ViewChild('tipoUnidadeSelect', {static: false}) tipoUnidadeSelect!: BrSelectComponent;
   @ViewChild('gerenciadoraSelect', {static: false}) gerenciadoraSelect!: BrSelectComponent;


   @ViewChild('formUser') formUser?: FormRepresentanteUnidadeComponent;
   formRepresentante!: FormGroup;
   representante: Usuario = new Usuario();

   constructor(
      private loadingService: LoadingService,
      private fb: FormBuilder,
      private unidadeService: UnidadeService,
      private cepService: CepService,
      private route: ActivatedRoute,
      private router: Router,
      private usuarioService: UsuarioService,
   ) {
      this.unidade = new Unidade();
      this.route.params.subscribe((param) => {
         this.uuid = param['uuid'];
      });

      this.formGroup = this.fb.group({
         id:[this.unidade.id],
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

      this.unidadeService.findUnidadeByUuid(this.uuid).subscribe((data) => {
         this.unidade = data;
         this.selecionaGerenciadora()
         this.unidade.idUnidadeGerenciadora = this.unidade.unidadeGerenciadora?.id;
         this.formGroup.patchValue(this.unidade);
      });
      this.usuarioService.findRepresentantesUnidade(this.uuid).subscribe((data) => {
         this.representantes = data;
         this.unidade.usuarios = data;
      })
   }
   ngOnInit() {
      this.unidadeService.findTiposUnidades().subscribe((data)=>{
         data.data?.forEach((tipo)=>{
            this.tipoUnidade.push({label:tipo.nome?.toString() , value:tipo.tipo});
         });
      });

   }


   selecionaGerenciadora() {
      this.unidades = [];
      switch(this.tipoUnidadeSelect.getOptionSelected()){
         case 'PS':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
            this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'SR':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
            this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'IVZ':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
            this.unidadeService.getGerenciadoras("SR").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'SN':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
            this.unidadeService.getGerenciadoras("MPA").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'DP':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
            this.unidadeService.getGerenciadoras("SN").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'SFP':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
            this.unidadeService.getGerenciadoras("MPA").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         default:
            this.validarUc = true;
            break;
      }
      console.log(this.unidades);
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

   editar(){
      console.log(this.isEdit)
      !this.isEdit? this.isEdit = true: this.isEdit = false;
      console.log(this.isEdit)
   }

   receberNovoUsuario(novoUsuario: Usuario) {
      console.log("parte 1")
      console.log(novoUsuario);
      this.representante = novoUsuario;
      const jaExiste = this.unidade.usuarios.find(user => this.comparaUsuarios(user, novoUsuario));
      if(!jaExiste){
         this.unidade.usuarios.push(this.representante);
      }

   }

   receberForm(form: FormGroup){
      console.log("parte 2")
      console.log(form);
      this.formRepresentante = form;
      this.representante.nome = this.formRepresentante.get('nome')?.value;
      this.representante.cpf = this.formRepresentante.get('cpf')?.value;
      this.representante.email = this.formRepresentante.get('email')?.value;
      const jaExiste = this.unidade.usuarios.find(user => this.comparaUsuarios(user, this.representante));
      if(!jaExiste){
         this.unidade.usuarios.push(this.representante);
      }
      this.representante = new Usuario();
   }
   comparaUsuarios(user1: Usuario, user2: Usuario){
      return user1.cpf == user2.cpf && user1.email == user2.email;
   }

   cancelarUsuario(user: Usuario){
      const index = this.unidade.usuarios.findIndex(u => u.nome === user.nome);
      if (index !== -1) {
         this.unidade.usuarios.splice(index, 1);
      }
   }

   salvar() {
      this.loadingService.show = true;
      this.unidade = this.formGroup.value;
      console.log(this.unidade);
      this.unidade.usuarios = this.representantes;
      this.unidadeService.update(this.unidade).subscribe(mensagem => {
         if(mensagem.status == 'SUCCESS'){
            Swal.fire('Ok', 'Unidade Atualizada com sucesso!', 'success').then(()=>{
               this.loadingService.show = false;
               this.router.navigate(['/portal-admin/unidades']);
            });
         }else{
            Swal.fire('Ops...', 'Houve uma falha!', 'error').then(()=>{
               this.loadingService.show = false;
               this.router.navigate(['/portal-admin/unidades']);
            });
         }
      });
      // setTimeout(() => {
      //    this.loadingService.show = false;
      //    this.router.navigate(['/portal-admin/unidades']);
      // }, 1200);
   }


}
