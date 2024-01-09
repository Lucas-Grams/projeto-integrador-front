import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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


declare var swal: any;

// interface Marker {
//    object: google.maps.Marker,
//    estabelecimento: any,
// }
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

   // markers: Marker[];
   // markerMapa: string;
   // markerSda: string;
   // @ViewChild('infoWindow') infoWindow: InfoWindow;
   // usuarioLogado = this.loginService.getUsuarioLogado();
   // maskLat: '00º00\'00.00"S' | '-00.000000' = '00º00\'00.00"S';
   // maskLng: '00º00\'00.00"W' | '-00.000000' = '00º00\'00.00"W';
   // special = ['º', '\'', '.', '"', '-', 'S', 'W'];
   // formato = FormatoGeo.DMS;
   // readonly formatos: string[] = Object.values(FormatoGeo);
   // @ViewChildren(InputComponent) inputs: QueryList<InputComponent>;
   // searchCoord: boolean;
   // pos: google.maps.LatLng;
   // mapZoom: number;
   // mapMarkerVisible: boolean;
   // map: google.maps.Map | null = null;
   // cidSubscription: Subscription | null = null;
   // coordSearch = {
   //    lat: '',
   //    long: ''
   // };
   // marker = {lat: null, lng: null};

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
               // public location: Location
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

      // this.mapZoom = 6;
      // this.mapMarkerVisible = false;
      // this.searchCoord = false;
   }

   ngOnInit() {
      this.unidadeService.findTiposUnidades().subscribe((data)=>{
         data.data?.forEach((tipo)=>{
            this.tipoUnidade.push({label:tipo.nome?.toString() , value:tipo.tipo});
         })
      })
   }


   selecionaGerenciadora() {
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
               // this.cepService.findAddress(this.unidade.endereco, () => {
               //    this.marker.lat = this.unidade.endereco.latitude;
               //    this.marker.lng = this.unidade.endereco.longitude;
               //    this.formGroup.get('latitude')?.setValue(this.marker.lat);
               //    this.formGroup.get('longitude')?.setValue(this.marker.lng);
               // });

            }
         });
      }

   }

   // moveuPontoMaps({target: marker}) {
   //    this.marker.lat = parseFloat(marker.getPosition().lat());
   //    this.marker.lng = parseFloat(marker.getPosition().lng());
   //    this.unidade.endereco.latitude = this.marker.lat;
   //    this.unidade.endereco.longitude = this.marker.lng;
   //    this.formGroup.get('latitude')?.setValue(this.marker.lat);
   //    this.formGroup.get('longitude')?.setValue(this.marker.lng);
   // }
   receberNovoUsuario(novoUsuario: Usuario) {
      this.representante = novoUsuario;
      this.unidade.usuarios?.push(this.representante);

   }

   receberForm(form: FormGroup){
      this.formRepresentante = form;
      this.representante.nome = this.formRepresentante.get('nome')?.value;
      this.representante.cpf = this.formRepresentante.get('cpf')?.value;
      this.representante.email = this.formRepresentante.get('email')?.value;
      this.unidade.usuarios.push(this.representante);
   }

   cancelarUsuario(user: Usuario){
      const index = this.unidade.usuarios.findIndex(u => u.nome === user.nome);
      if (index !== -1) {
         this.unidade.usuarios.splice(index, 1);
      }
   }

   salvar() {
      this.loadingService.show = true;
      if(this.gerenciadoraSelect.getOptionSelected()) {
         this.formGroup.get("idUnidadeGerenciadora")?.setValue(this.gerenciadoraSelect.getOptionSelected());
      }
      this.unidade = this.formGroup.value;
      console.log(this.unidade);
      this.unidadeService.salvar(this.unidade).subscribe(mensagem => {
        // swal.fire(mensagem.msg).then();
      });
      setTimeout(() => {
         this.loadingService.show = false;
         this.router.navigate(['/portal-admin/unidades']);
      }, 1200);
   }

}
