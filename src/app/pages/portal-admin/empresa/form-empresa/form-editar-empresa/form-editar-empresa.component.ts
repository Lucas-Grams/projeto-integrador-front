import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../../../../core/models/usuario.model";
import {UsuarioService} from "../../../../../core/services/usuario.service";
import Swal from "sweetalert2";
import {LoadingService} from "../../../../../core/services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CepService} from "../../../../../core/services/cep.service";
import {Empresa} from "../../../../../core/models/empresa.model";
import {EmpresaUsuario} from "../../../../../core/models/empresa-usuario.model";
import {EmpresaService} from "../../../../../core/services/empresa.service";
import {cnpjValidator} from "../../../../../utils/validators/cnpj.validator";
import {InfoWindow} from "@ngui/map";
import {Permissao} from "../../../../../core/models/permissao.model";

@Component({
    selector: 'pnip-admin-form-empresa',
    templateUrl: './form-editar-empresa.component.html',
    styleUrls: [],
    providers:[CepService]
})

export class FormEditarEmpresaComponent implements OnInit {

    public breadcrumb = [
        {
            label: 'Home',
            url: '/portal-admin',
            home: true
        },
        {
            label: 'Empresaa',
            url: '/portal-admin/empresas'
        },
        {
            label: 'Visualizar empresa',
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

    empresa: Empresa = new Empresa();
    formGroup: FormGroup;
    usuario: Usuario[] = [];
    empresaUsuario: EmpresaUsuario[] = [];
    isEdit: boolean = false;
    uuid:String = '';

    constructor(private fb: FormBuilder, private empresaService:EmpresaService, private usuarioService: UsuarioService, private loadingService: LoadingService, private router: Router,private route: ActivatedRoute,
                private cepService:CepService) {
        this.route.params.subscribe((param) => {
            this.uuid = param['uuid'];
        });

        this.formGroup = this.fb.group({
            razaoSocial:this.fb.control(this.empresa.razaoSocial, [Validators.minLength(2), Validators.maxLength(100), Validators.required]),
            nomeFantasia:this.fb.control(this.empresa.nomeFantasia, [Validators.minLength(2), Validators.maxLength(100), Validators.required]),
            cnpj:this.fb.control(this.empresa.cnpj, [Validators.required, cnpjValidator()]),
            cep: this.fb.control(this.empresa.endereco?.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
            rua: this.fb.control(this.empresa.endereco?.rua, [Validators.minLength(2), Validators.maxLength(70), Validators.required]),
            numero: this.fb.control(this.empresa.endereco?.numero, [Validators.minLength(1), Validators.required]),
            complemento: this.fb.control(this.empresa.endereco?.complemento, [Validators.minLength(2), Validators.maxLength(50)]),
            cidade: this.fb.control(this.empresa.endereco?.cidade, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
            uf: this.fb.control(this.empresa.endereco?.uf, [Validators.minLength(2), Validators.maxLength(2), Validators.required]),
            latitude: this.fb.control(this.empresa.endereco?.latitude, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
            longitude: this.fb.control(this.empresa.endereco?.longitude, [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        });

        this.empresaService.findEmpresaByUuid(this.uuid).subscribe((data) =>{
            this.empresa = data;
            this.validaCoordenadas();
            this.buildValues();
        })

        this.empresaService.findUsuariosByUuidEmpresa(this.uuid).subscribe((data) => {
            this.empresaUsuario = data;
            this.filterEmpresaUsuario(this.empresaUsuario);
        });

        this.mapZoom = 6;
        this.mapMarkerVisible = false;
        this.searchCoord = false;
    }

    ngOnInit() {
    }

    buildValues(){
        this.formGroup.get("razaoSocial")?.setValue(this.empresa.razaoSocial);
        this.formGroup.get("nomeFantasia")?.setValue(this.empresa.nomeFantasia);
        this.formGroup.get("cnpj")?.setValue(this.empresa.cnpj);
        this.formGroup.get("cep")?.setValue(this.empresa.endereco.cep);
        this.formGroup.get("rua")?.setValue(this.empresa.endereco.rua);
        this.formGroup.get("numero")?.setValue(this.empresa.endereco.numero);
        this.formGroup.get("complemento")?.setValue(this.empresa.endereco.complemento);
        this.formGroup.get("cidade")?.setValue(this.empresa.endereco.cidade);
        this.formGroup.get("uf")?.setValue(this.empresa.endereco.uf);
    }

    filterEmpresaUsuario(vinculos: EmpresaUsuario[]) {
        let vinculosFiltrados: EmpresaUsuario[] = [];

        vinculos.forEach((emp) => {
            if (vinculosFiltrados.length === 0) {
                vinculosFiltrados.push(emp);
            } else {
                let i = vinculosFiltrados.findIndex((item) => item.usuario.id === emp.usuario.id);

                if (i === -1) {
                    vinculosFiltrados.push(emp);
                } else {
                    vinculosFiltrados[i].permissao.push(...emp.permissao);
                }
            }
        });
        this.empresaUsuario = [];
        this.empresaUsuario = vinculosFiltrados;
    }

    validaCEP(cepUnidade?: String) {
        const field = this.formGroup?.get('cep');
        let cep;
        if (cepUnidade) {
            cep = cepUnidade;
        } else {
            if (!field?.value) return;
            cep = field?.value[0];
        }
        if (cep.length === 9) {
            this.cepService.getAddrress(cep).subscribe(response => {
                if (response && !response.erro) {
                    this.formGroup.get('rua')?.setValue(response.logradouro);
                    this.formGroup.get('cidade')?.setValue(response.localidade);
                    this.formGroup.get('uf')?.setValue(response.uf);

                    if (this.empresa.endereco) {
                        this.empresa.endereco.rua = response.logradouro;
                        this.empresa.endereco.cidade = response.localidade;
                        this.empresa.endereco.uf = response.uf;
                    }

                    if (this.empresa.endereco) {
                        this.cepService.findAddress(this.empresa.endereco, () => {
                            this.marker.lat = this.empresa.endereco?.latitude?.toString() || '';
                            this.marker.lng = this.empresa.endereco?.longitude?.toString() || '';
                            this.formGroup.get('latitude')?.setValue(this.marker.lat);
                            this.formGroup.get('longitude')?.setValue(this.marker.lng);
                            this.latLng = this.marker.lat + ', ' + this.marker.lng;
                        });
                    }
                }
            });
        }
    }

    validaCoordenadas() {
        if (!this.empresa.endereco.latitude && !this.empresa.endereco.longitude) {
            this.validaCEP(this.empresa.endereco.cep);
        } else {
            this.marker.lat = this.empresa.endereco.latitude.toString();
            this.marker.lng = this.empresa.endereco.longitude.toString();
            this.formGroup?.get('latitude')?.setValue(this.marker.lat);
            this.formGroup?.get('longitude')?.setValue(this.marker.lng);
            this.latLng = this.marker.lat + ', ' + this.marker.lng;
        }
    }

    moveuPontoMaps(event: any) {
        this.latLng = event.latLng?.toString().replace(/[()]/g, '') || '';
        const [lat, lng] = this.latLng.split(',').map(coord => coord.trim());
        this.marker.lat = lat;
        this.marker.lng = lng;

        if (this.empresa.endereco) {
            this.empresa.endereco.latitude = this.marker.lat;
            this.empresa.endereco.longitude = this.marker.lng;
        }

        this.formGroup.get('latitude')?.setValue(this.marker.lat);
        this.formGroup.get('longitude')?.setValue(this.marker.lng);
    }

    editar() {
        !this.isEdit ? this.isEdit = true : this.isEdit = false;
    }

    receberNovoUsuario(novoUsuario: Usuario) {
        const jaExiste = this.empresaUsuario.find(emp => this.comparaUsuarios(emp, novoUsuario));
        if (!jaExiste) {
            const permissao: Permissao = {id: null, descricao: 'representante'};
            let empUsu = new EmpresaUsuario();
            empUsu.usuario = novoUsuario;
            empUsu.empresa = this.empresa;
            empUsu.permissao.push(permissao);
            empUsu.ativo = true;
            this.empresaUsuario.push(empUsu);
        }else{
           this.empresaUsuario.forEach((emp)=>{
              if(this.comparaUsuarios(emp, novoUsuario) && emp.ativo == false){
                 emp.ativo = true;
              }
           })
        }
    }
    isRepresentante(emp: EmpresaUsuario): boolean {
        if (emp.permissao && emp.permissao != null && emp.permissao != undefined) {
            if(emp.permissao.length>1) {
                for (const perm of emp.permissao) {
                    if (perm.descricao?.includes('representante')) {
                        return true;
                    }
                }
            }else{
                let retorno: boolean;
                (emp.permissao[0].descricao?.includes('representante')? retorno=true: retorno=false);
                return retorno;
            }
        }
        return false;
    }

    usuarioIsRepresentante(uni: EmpresaUsuario): void {
        const permissao: Permissao = {id: null, descricao: 'representante'};
        if (!uni.permissao) {
            uni.permissao = [];
        }
        const permissaoIndex: number = uni.permissao.findIndex((perm) => perm.descricao === 'representante');
        if (permissaoIndex === -1) {
            // Se o usuário não tem a permissão, adiciona
            uni.permissao.splice(0, 0, permissao);
        } else {
            // Se o usuário já tem a permissão, remove
            uni.permissao.splice(permissaoIndex, 1);
        }
    }


    comparaUsuarios(emp: EmpresaUsuario, user: Usuario) {
        return emp.usuario.cpf == user.cpf && emp.usuario.email == user.email;
    }

    cancelarUsuario(empresa: EmpresaUsuario) {
        const index = this.empresaUsuario.findIndex(emp => emp.usuario.cpf === empresa.usuario.cpf);
        if (index !== -1) {
            this.empresaUsuario[index].ativo = false;
        }
    }

    montaObjeto() {
        this.empresa.razaoSocial = this.formGroup.get("razaoSocial")?.value?.toString();
        this.empresa.nomeFantasia = this.formGroup.get("nomeFantasia")?.value?.toString();
        this.empresa.cnpj = this.formGroup.get("cnpj")?.value?.toString();
        this.empresa.endereco.cep = this.formGroup.get("cep")?.value?.toString();
        this.empresa.endereco.cidade = this.formGroup.get("cidade")?.value?.toString();
        this.empresa.endereco.uf = this.formGroup.get("uf")?.value?.toString();
        this.empresa.endereco.rua = this.formGroup.get("rua")?.value?.toString();
        this.empresa.endereco.bairro = this.formGroup.get("bairro")?.value?.toString();
        this.empresa.endereco.numero = this.formGroup.get("numero")?.value?.toString();
        this.empresa.endereco.complemento = this.formGroup.get("complemento")?.value?.toString();
        this.empresa.endereco.latitude = this.formGroup.get("latitude")?.value?.toString();
        this.empresa.endereco.longitude = this.formGroup.get("longitude")?.value?.toString();
        this.empresa.ativo = true;
    }


    salvar() {
        if (this.formGroup?.valid ) {
            this.montaObjeto();
            if (this.empresaUsuario.length == 0) {
                let emp = new EmpresaUsuario();
                emp.empresa = this.empresa;
                this.empresaUsuario.push(emp);
            } else {
                this.empresaUsuario.forEach((emp) => {
                    emp.empresa = this.empresa;
                });
            }

            this.empresaService.salvar(this.empresaUsuario).subscribe(mensagem => {
                if (mensagem.status === 'SUCCESS' ) {
                    Swal.fire("OK.", 'Empresa atualizada com sucesso!', 'success').then(()=>{
                        this.loadingService.show = true;
                        this.router.navigate(['/portal-admin/empresas']);
                        this.loadingService.show = false;
                    });
                }else{
                    this.loadingService.show = false;
                    Swal.fire('Ops.',"Ocorreu um erro ao salvar a empresa, tente novamente mais tarde.", 'error').then();
                }
            });
        } else {
            Swal.fire('Ops...', 'Formulário incompleto!', 'error').then();
        }
    }
}
