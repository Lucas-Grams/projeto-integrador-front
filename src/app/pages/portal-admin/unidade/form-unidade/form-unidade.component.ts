import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
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
import {Usuario} from "../../../../core/models/usuario.model";
import {FormRepresentanteUnidadeComponent} from "./form-representante-unidade/form-representante-unidade.component";
import {Endereco} from "../../../../core/models/endereco.model";
import {BrSelectComponent} from "../../../../shared/br-select/br-select.component";
import {Hash} from "angular-oauth2-oidc/token-validation/fast-sha256js";
import {TipoUnidade} from "../../../../core/models/tipo-unidade.model";
import {Location} from "@angular/common";
import {InfoWindow} from "@ngui/map";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";
import {getTokenAtPosition} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";


declare var swal: any;

interface Marker {
   object: google.maps.Marker,
}
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

   @ViewChild('infoWindow') infoWindow?: InfoWindow;
   searchCoord: boolean = false;
   mapZoom: number = 16;
   mapMarkerVisible?: boolean;
   map: google.maps.Map | null = null;
   marker: { lat: any, lng: any } = { lat: '', lng: '' };
   latLng: string = '';


   formGroup: FormGroup;
   unidade: Unidade;
   unidadesGerenciadoras: Unidade[] = [];
   unidades:any = [];
   @ViewChild('tipoUnidadeSelect', {static: false}) tipoUnidadeSelect!: BrSelectComponent;
   @ViewChild('gerenciadoraSelect', {static: false}) gerenciadoraSelect!: BrSelectComponent;

   validarUc: boolean = false;
   newUsuario: Usuario = new Usuario();

   @ViewChild('formUser') formUser?: FormRepresentanteUnidadeComponent;
   formRepresentante!: FormGroup;
   representante: Usuario = new Usuario();

   tipoUnidade:any = [];


   constructor(private loadingService: LoadingService,
               private router: Router,
               private fb: FormBuilder,
               private unidadeService: UnidadeService,
               private cepService: CepService,
                public location: Location
   ) {
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
         longitude: this.fb.control( this.unidade.endereco.longitude, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
         usuarios: this.fb.control( this.unidade.usuarios)
      });

      this.mapZoom = 6;
      this.mapMarkerVisible = false;
      this.searchCoord = false;
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
      let tipo;
      this.tipoUnidadeSelect.getOptionSelected().length > 0?tipo = this.tipoUnidadeSelect.getOptionSelected(): tipo = this.unidade.tipo;
      switch(tipo){
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
            this.formGroup.get("tipo")?.setValue(tipo);
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
               this.formGroup.get('bairro')?.setValue(response.bairro);
               this.unidade.endereco.rua = response.logradouro;
               this.unidade.endereco.cidade = response.localidade;
               this.unidade.endereco.uf = response.uf;
               this.unidade.endereco.bairro = response.bairro;
               this.cepService.findAddress(this.unidade.endereco, () => {
                  this.marker.lat = this.unidade.endereco.latitude.toString();
                  this.marker.lng = this.unidade.endereco.longitude.toString();
                  this.formGroup.get('latitude')?.setValue(this.marker.lat);
                  this.formGroup.get('longitude')?.setValue(this.marker.lng);
                  this.latLng = this.marker.lat + ', ' + this.marker.lng;
               });
            }
         });
      }

   }

   moveuPontoMaps(event:any) {
      this.latLng = event.latLng.toString().replace(/[()]/g, '');
      const [lat, lng] = this.latLng.split(',').map(coord => coord.trim());

      this.marker.lat = lat;
      this.marker.lng = lng;
      this.unidade.endereco.latitude = this.marker.lat;
      this.unidade.endereco.longitude = this.marker.lng;
      this.formGroup.get('latitude')?.setValue(this.marker.lat);
      this.formGroup.get('longitude')?.setValue(this.marker.lng);
   }
   receberNovoUsuario(novoUsuario: Usuario) {

      this.representante = novoUsuario;
      this.representante.permissao?.push('so');
      console.log(novoUsuario);
      const jaExiste = this.unidade.usuarios.find(user => this.comparaUsuarios(user, novoUsuario));
      if(!jaExiste){
         this.unidade.usuarios.push(this.representante);
      }
   }

   receberForm(form: FormGroup){
      this.formRepresentante = form;
      this.representante.nome = this.formRepresentante.get('nome')?.value;
      this.representante.cpf = this.formRepresentante.get('cpf')?.value;
      this.representante.email = this.formRepresentante.get('email')?.value;
      this.representante.permissao?.push('so');
      console.log(this.representante);
      const jaExiste = this.unidade.usuarios.find(user => this.comparaUsuarios(user, this.representante));
      if(!jaExiste){
         this.unidade.usuarios.push(this.representante);
         console.log(this.unidade.usuarios)
      }
      this.representante = new Usuario();
   }
   comparaUsuarios(user1: Usuario, user2: Usuario){
      return user1.cpf == user2.cpf && user1.email == user2.email;
   }
   usuarioIsRepresentante(user: Usuario){
      console.log("testou");
      let position: number = 0;
      user.permissao?.includes('representante')? position = user.permissao?.indexOf('representante'):  user.permissao?.push('representante');
      if(position > 0){
         user.permissao?.splice(position, 1);
      }
   }

   isRepresentante(user: Usuario){
      console.log("testou1");
      console.log(user.permissao?.includes('representante')?  true:  false)
      return user.permissao?.includes('representante')?  true:  false;
   }



   cancelarUsuario(user: Usuario){
      const index = this.unidade.usuarios.findIndex(u => u.nome === user.nome);
      if (index !== -1) {
         this.unidade.usuarios.splice(index, 1);
      }
   }

   salvar() {
      this.loadingService.show = true;
      if (this.gerenciadoraSelect) {
         this.formGroup.get("idUnidadeGerenciadora")?.setValue(this.gerenciadoraSelect.getOptionSelected());
      }
      this.unidade = this.formGroup.value;
      console.log(this.unidade);
      //if (this.formGroup.valid) {
         // this.unidadeService.salvar(this.unidade).subscribe(mensagem => {
         //    swal.fire(mensagem.msg).then();
         // });
         // setTimeout(() => {
         //    this.loadingService.show = false;
         //    this.router.navigate(['/portal-admin/unidades']);
         // }, 1200);
      //}else{
         //Swal.fire('Ops...', 'Formulário incompleto!', 'error').then();
      //}
   }

}
