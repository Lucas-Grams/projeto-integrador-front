import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CepService} from "../../../../../core/services/cep.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {cpfValidator} from "../../../../../utils/validators/cpf.validator";
import {cepValidator} from "../../../../../utils/validators/cep.validator";
import {Usuario} from "../../../../../core/models/usuario.model";
import {UsuarioService} from "../../../../../core/services/usuario.service";
@Component({
   selector: 'pnip-admin-form-representante-unidade',
   templateUrl: './form-representante-unidade.component.html',
   styleUrls: [],
   providers:[CepService]
})
export class FormRepresentanteUnidadeComponent implements OnInit{

   @Output() emitirForm = new EventEmitter<FormGroup>();
   public formGroup2: FormGroup;

   novoUser: boolean = false;
   usuarios: Usuario[] = [];
   newUsuario: Usuario = new Usuario();
   @Output() newUserEmitter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

   constructor(private fb: FormBuilder,
               private cepService: CepService,
               private usuarioService: UsuarioService) {
      this.formGroup2 = this.fb.group({
         nome: [this.newUsuario?.nome, [Validators.required, Validators.maxLength(100)]],
         cpf: [this.newUsuario?.cpf, [Validators.required, cpfValidator()]],
         email: [this.newUsuario?.email, [Validators.required, Validators.email, Validators.maxLength(70)]],
         senha: [this.newUsuario?.senha, [Validators.required, Validators.minLength(8), Validators.maxLength(70)]],
         cep: [this.newUsuario?.endereco?.cep, [Validators.required, cepValidator()]],
         rua: [this.newUsuario?.endereco?.rua],
         numero: [this.newUsuario?.endereco?.numero],
         complemento: [this.newUsuario?.endereco?.complemento],
         cidade: [this.newUsuario?.endereco?.cidade],
         bairro: [this.newUsuario?.endereco?.bairro],
         uf: [this.newUsuario?.endereco?.uf]
      });

      this.formGroup2.valueChanges.subscribe(() => {
         this.emitirForm.emit(this.formGroup2);
      });
   }

   ngOnInit() {
      this.usuarioService.findAll().subscribe((data) => {
         this.usuarios = data;
      })
   }

   getAddressByCep() {
      const field = this.formGroup2.get('cep');
      if (!field?.value) return;
      const cep = field?.value[0];
      if (cep.length === 9) {
         this.cepService.getAddrress(cep).subscribe(response => {
            if (response && !response.erro) {
               this.formGroup2.get('rua')?.setValue(response.logradouro);
               this.formGroup2.get('cidade')?.setValue(response.localidade);
               this.formGroup2.get('uf')?.setValue(response.uf);
            }
         });
      }
   }

   verificaNovoUser(event: boolean){
      event? this.novoUser = true: this.novoUser = false;
   }

   selecionaUsuario(user: Usuario){
      this.newUsuario = user;
      this.emitirNovoUsuario();
   }

   emitirNovoUsuario() {
      console.log("emitir novo user");
      if(this.novoUser){
         this.newUsuario = this.formGroup2.value;
      }
      if(this.newUsuario != null && this.newUsuario != undefined){
         this.newUserEmitter.emit(this.newUsuario);
      }
   }
}