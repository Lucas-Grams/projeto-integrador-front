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
import {InfoWindow} from "@ngui/map";

interface Marker {
   object: google.maps.Marker,
}
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

   @ViewChild('infoWindow') infoWindow?: InfoWindow;
   searchCoord: boolean = false;
   mapZoom: number;
   mapMarkerVisible?: boolean;
   map: google.maps.Map | null = null;
   marker: { lat: any, lng: any } = { lat: '', lng: '' };
   latLng: string = '';

   isEdit: boolean = false;
   public formGroup: FormGroup;
   unidade: Unidade;
   unidadesGerenciadoras: Unidade[] = [];
   uuid: string = '';
   unidadeId?:number;
   unidadeGerenciadoraId?:number;

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
         this.unidadeId = data.id;
         this.unidade.idUnidadeGerenciadora = data.unidadeGerenciadora?.id;
         this.unidadeGerenciadoraId =  data.unidadeGerenciadora?.id;
         this.validaCoordenadas();
         this.selecionaGerenciadora()
      });
      this.usuarioService.findRepresentantesUnidade(this.uuid).subscribe((data) => {
         this.representantes = data;
         this.unidade.usuarios = data;
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
      this.selecionaGerenciadora();
   }


   selecionaGerenciadora() {
      this.unidades = [];
      let tipo;
      this.tipoUnidadeSelect.getOptionSelected().length > 0?tipo = this.tipoUnidadeSelect.getOptionSelected(): tipo = this.unidade.tipo;
      switch(tipo){
         case 'PS':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(tipo);
            this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'SR':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(tipo);
            this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'IVZ':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(tipo);
            this.unidadeService.getGerenciadoras("SR").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'SN':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(tipo);
            this.unidadeService.getGerenciadoras("MPA").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'DP':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(tipo);
            this.unidadeService.getGerenciadoras("SN").subscribe((data) => {
               this.unidadesGerenciadoras = data;
               this.unidadesGerenciadoras.forEach((uni)=>{
                  this.unidades.push({label:uni.nome.toString(), value:uni.id});
               });
            })
            break;
         case 'SFP':
            this.validarUc = false;
            this.formGroup.get("tipo")?.setValue(tipo);
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


   validaCEP(cepUnidade?: String) {
      const field = this.formGroup.get('cep');
      let cep;
      if(cepUnidade){
         cep = cepUnidade;
      }else {
         if (!field?.value) return;
         cep = field?.value[0];
      }
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

   validaCoordenadas(){
      if(!this.unidade.endereco.latitude && !this.unidade.endereco.longitude){
         this.validaCEP(this.unidade.endereco.cep);
      }else{
         this.marker.lat = this.unidade.endereco.latitude.toString();
         this.marker.lng = this.unidade.endereco.longitude.toString();
         this.formGroup.get('latitude')?.setValue(this.marker.lat);
         this.formGroup.get('longitude')?.setValue(this.marker.lng);
         this.latLng = this.marker.lat + ', ' + this.marker.lng;
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

   editar(){
      !this.isEdit? this.isEdit = true: this.isEdit = false;
   }

   receberNovoUsuario(novoUsuario: Usuario) {
      this.representante = novoUsuario;
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
      this.unidade.id = this.unidadeId;
      this.unidade.idUnidadeGerenciadora = this.unidadeGerenciadoraId;
      if(this.gerenciadoraSelect) {
         this.formGroup.get("idUnidadeGerenciadora")?.setValue(this.gerenciadoraSelect.getOptionSelected());
      }
      this.unidade.usuarios = this.representantes;
      if(this.formGroup.valid) {
         this.unidadeService.update(this.unidade).subscribe(mensagem => {
            if (mensagem.status == 'SUCCESS') {
               Swal.fire('Ok', 'Unidade Atualizada com sucesso!', 'success').then(() => {
                  this.loadingService.show = false;
                  this.router.navigate(['/portal-admin/unidades']);
               });
            } else {
               Swal.fire('Ops...', 'Houve uma falha!', 'error').then(() => {
                  this.loadingService.show = false;
                  this.router.navigate(['/portal-admin/unidades']);
               });
            }
         });
      }else{
         Swal.fire('Ops...', 'Formulário incompleto!', 'error').then();
      }
      // setTimeout(() => {
      //    this.loadingService.show = false;
      //    this.router.navigate(['/portal-admin/unidades']);
      // }, 1200);
   }


}
