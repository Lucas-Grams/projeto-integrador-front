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

   public formGroup2!: FormGroup;

   novoUser: boolean = false;
   usuarios: Usuario[] = [];
   @Input() newUsuario!: Usuario;
   @Output() newUserEmitter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

   constructor(private fb: FormBuilder,
               private cepService: CepService,
               private usuarioService: UsuarioService) {

   }

   ngOnInit() {
      this.formGroup2 = this.fb.group({
         nome: [this.newUsuario?.nome, [Validators.required, Validators.maxLength(100)]],
         cpf: [this.newUsuario?.cpf, [Validators.required, cpfValidator()]],
         email: [this.newUsuario?.email, [Validators.required, Validators.email, Validators.maxLength(70)]],
         senha: [this.newUsuario?.senha, [Validators.required, Validators.minLength(8), Validators.maxLength(70)]],
         cep: [this.newUsuario.endereco?.cep, [Validators.required, cepValidator()]],
         rua: [this.newUsuario.endereco?.rua],
         numero: [this.newUsuario.endereco?.numero],
         complemento: [this.newUsuario.endereco?.complemento],
         cidade: [this.newUsuario.endereco?.cidade],
         uf: [this.newUsuario.endereco?.uf]
      });

      this.usuarioService.findAll().subscribe((data) => {
         this.usuarios = data;
      })
   }

   getAddressByCep() {
      const field = this.formGroup2.get('cep');
      console.log(field);
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

   selecionaUsuario(event: any){
      this.newUsuario = event;
      this.emitirNovoUsuario();
   }

   emitirNovoUsuario() {
      const newUser = this.formGroup2.value;
      this.newUserEmitter.emit(newUser);
   }

   salvar(){

   }
}
