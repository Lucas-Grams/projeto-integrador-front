import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";
import {Unidade} from "../../../../core/models/unidade.model";
import {UnidadeService} from "../../../../core/services/unidade.service";
import {CepService} from "../../../../core/services/cep.service";
import {Usuario} from "../../../../core/models/usuario.model";
import {FormRepresentanteUnidadeComponent} from "./form-representante-unidade/form-representante-unidade.component";
import {BrSelectComponent} from "../../../../shared/br-select/br-select.component";
import {Location} from "@angular/common";
import {InfoWindow} from "@ngui/map";
import Swal from "sweetalert2";
import {UnidadeUsuario} from "../../../../core/models/unidade-usuario.model";
import {Permissao} from "../../../../core/models/permissao.model";


declare var swal: any;

interface Marker {
    object: google.maps.Marker,
}

@Component({
    selector: 'pnip-admin-form-unidade',
    templateUrl: './form-unidade.component.html',
    styleUrls: [],
    providers: [CepService]

})

export class FormUnidadeComponent implements OnInit {

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
    marker: { lat: any, lng: any } = {lat: '', lng: ''};
    latLng: string = '';


    formGroup: FormGroup;
    unidade: Unidade;
    unidadesGerenciadoras: Unidade[] = [];
    unidades: any = [];
    @ViewChild('tipoUnidadeSelect', {static: false}) tipoUnidadeSelect!: BrSelectComponent;
    @ViewChild('gerenciadoraSelect', {static: false}) gerenciadoraSelect!: BrSelectComponent;

    validarUc: boolean = false;
    newUsuario: Usuario = new Usuario();

    @ViewChild('formUser') formUser?: FormRepresentanteUnidadeComponent;
    formRepresentante!: FormGroup;
    representante: Usuario = new Usuario();

   tipoUnidade: any = [];
   unidadeUsuario: UnidadeUsuario[] = [];


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
            cep: this.fb.control(this.unidade.endereco.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
            rua: this.fb.control(this.unidade.endereco.rua, [Validators.minLength(2), Validators.maxLength(70), Validators.required]),
            numero: this.fb.control(this.unidade.endereco.numero, [Validators.minLength(1), Validators.required]),
            bairro: this.fb.control(this.unidade.endereco.bairro, [Validators.minLength(2), Validators.maxLength(50)]),
            complemento: this.fb.control(this.unidade.endereco.complemento, [Validators.minLength(2), Validators.maxLength(50)]),
            cidade: this.fb.control(this.unidade.endereco.cidade, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
            uf: this.fb.control(this.unidade.endereco.uf, [Validators.minLength(2), Validators.maxLength(2), Validators.required]),
            latitude: this.fb.control(this.unidade.endereco.latitude, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
            longitude: this.fb.control(this.unidade.endereco.longitude, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
            usuarios: this.fb.control(this.unidade.usuarios)
        });

        this.mapZoom = 6;
        this.mapMarkerVisible = false;
        this.searchCoord = false;
    }

    ngOnInit() {
        this.unidadeService.findTiposUnidades().subscribe((data) => {
            data.data?.forEach((tipo) => {
                this.tipoUnidade.push({label: tipo.nome?.toString(), value: tipo.tipo});
            });
        });
        this.representante = new Usuario();
    }


    selecionaGerenciadora() {
        this.unidades = [];
        let tipo;
        this.tipoUnidadeSelect.getOptionSelected().length > 0 ? tipo = this.tipoUnidadeSelect.getOptionSelected() : tipo = this.unidade.tipo;
        switch (tipo) {
            case 'PS':
                this.validarUc = false;
                this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
                this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
                    this.unidadesGerenciadoras = data;
                    this.unidadesGerenciadoras.forEach((uni) => {
                        this.unidades.push({label: uni.nome.toString(), value: uni.id});
                    });
                })
                break;
            case 'SR':
                this.validarUc = false;
                this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
                this.unidadeService.getGerenciadoras("UC").subscribe((data) => {
                    this.unidadesGerenciadoras = data;
                    this.unidadesGerenciadoras.forEach((uni) => {
                        this.unidades.push({label: uni.nome.toString(), value: uni.id});
                    });
                })
                break;
            case 'IVZ':
                this.validarUc = false;
                this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
                this.unidadeService.getGerenciadoras("SR").subscribe((data) => {
                    this.unidadesGerenciadoras = data;
                    this.unidadesGerenciadoras.forEach((uni) => {
                        this.unidades.push({label: uni.nome.toString(), value: uni.id});
                    });
                })
                break;
            case 'SN':
                this.validarUc = false;
                this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
                this.unidadeService.getGerenciadoras("MPA").subscribe((data) => {
                    this.unidadesGerenciadoras = data;
                    this.unidadesGerenciadoras.forEach((uni) => {
                        this.unidades.push({label: uni.nome.toString(), value: uni.id});
                    });
                })
                break;
            case 'DP':
                this.validarUc = false;
                this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
                this.unidadeService.getGerenciadoras("SN").subscribe((data) => {
                    this.unidadesGerenciadoras = data;
                    this.unidadesGerenciadoras.forEach((uni) => {
                        this.unidades.push({label: uni.nome.toString(), value: uni.id});
                    });
                })
                break;
            case 'SFP':
                this.validarUc = false;
                this.formGroup.get("tipo")?.setValue(this.tipoUnidadeSelect.getOptionSelected());
                this.unidadeService.getGerenciadoras("MPA").subscribe((data) => {
                    this.unidadesGerenciadoras = data;
                    this.unidadesGerenciadoras.forEach((uni) => {
                        this.unidades.push({label: uni.nome.toString(), value: uni.id});
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

    moveuPontoMaps(event: any) {
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
        const jaExiste = this.unidadeUsuario.find(uni => this.comparaUsuarios(uni, novoUsuario));
        if (!jaExiste) {
            const permissao: Permissao = {id: null, descricao: 'so'};
            let uniUsu = new UnidadeUsuario();
            uniUsu.usuario = novoUsuario;
            uniUsu.unidade = this.unidade;
            this.unidade.usuarios.push(this.representante);
            uniUsu.permissao.push(permissao);
            uniUsu.ativo = true;
            this.unidadeUsuario.push(uniUsu);
        }
    }

    comparaUsuarios(uni: UnidadeUsuario, user: Usuario) {
        return uni.usuario.cpf == user.cpf && uni.usuario.email == user.email;
    }

    usuarioIsRepresentante(uni: UnidadeUsuario): void {
        const permissao: Permissao = {id: null, descricao: 'representante'};
        if (!uni.permissao) {
            uni.permissao = [];
        }
        const permissaoIndex: number = uni.permissao.findIndex((perm) => perm.descricao === 'representante');
        if (permissaoIndex === -1) {
            uni.permissao.splice(0, 0, permissao);
        } else {
            uni.permissao.splice(permissaoIndex, 1);
        }
    }

    isRepresentante(uni: UnidadeUsuario): boolean {
        if (uni.permissao && uni.permissao != null && uni.permissao != undefined) {
            for (const perm of uni.permissao) {
                if (perm.descricao?.includes('representante')) {
                    return true;
                }
            }
        }
        return false;
    }


    cancelarUsuario(unidade: UnidadeUsuario) {
        const index = this.unidadeUsuario.findIndex(uni => uni.usuario.cpf === unidade.usuario.cpf);
        if (index !== -1) {
            this.unidadeUsuario.splice(index, 1);
        }
    }


   montaObjeto() {
      this.unidade.nome = this.formGroup.get("nome")?.value;
      this.unidade.tipo = this.formGroup.get("tipo")?.value;
      this.unidade.endereco.cep = this.formGroup.get("cep")?.value.toString();
      this.unidade.endereco.cidade = this.formGroup.get("cidade")?.value.toString();
      this.unidade.endereco.uf = this.formGroup.get("uf")?.value.toString();
      this.unidade.endereco.rua = this.formGroup.get("rua")?.value.toString();
      this.unidade.endereco.bairro = this.formGroup.get("bairro")?.value.toString();
      this.unidade.endereco.numero = this.formGroup.get("numero")?.value.toString();
      this.unidade.endereco.complemento = this.formGroup.get("complemento")?.value.toString();
      this.unidade.endereco.latitude = this.formGroup.get("latitude")?.value.toString();
      this.unidade.endereco.longitude = this.formGroup.get("longitude")?.value.toString();
      this.unidade.ativo = true;
      if (this.gerenciadoraSelect) {
         this.formGroup.get("idUnidadeGerenciadora")?.setValue(this.gerenciadoraSelect.getOptionSelected());
         this.unidade.idUnidadeGerenciadora = this.gerenciadoraSelect.getOptionSelected();
         this.unidadesGerenciadoras.forEach((uni)=>{
            if(uni.id == this.unidade.idUnidadeGerenciadora){
               this.unidade.unidadeGerenciadora = uni;
            }
         });
      }
   }

   salvar() {
      if (this.formGroup.valid) {
         this.montaObjeto();
         if (this.unidadeUsuario.length == 0) {
            let uni = new UnidadeUsuario();
            this.unidadeUsuario.push(uni);
         } else {
            this.unidadeUsuario.forEach((uni) => {
               uni.unidade = this.unidade;
            });
         }
         console.log(this.unidadeUsuario)
         this.unidadeService.salvar(this.unidadeUsuario).subscribe(mensagem => {
            if (mensagem.status === 'SUCCESS' ) {
               Swal.fire("OK.", 'Unidade cadastrada com sucesso!', 'success').then(()=>{
                  this.loadingService.show = true;
                  this.router.navigate(['/portal-admin/unidades']);
                  this.loadingService.show = false;
               });
            }else{
               this.loadingService.show = false;
               Swal.fire('Ops.',"Ocorreu um erro ao salvar a unidade, tente novamente mais tarde.", 'error').then();
            }
         });
      } else {
         Swal.fire('Ops...', 'Formulário incompleto!', 'error').then();
      }
   }
}
