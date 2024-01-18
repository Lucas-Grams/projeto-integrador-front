import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {CepService} from "../../../../../core/services/cep.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {cpfValidator} from "../../../../../utils/validators/cpf.validator";
import {cepValidator} from "../../../../../utils/validators/cep.validator";
import {Permissao, Usuario} from "../../../../../core/models/usuario.model";
import {UsuarioService} from "../../../../../core/services/usuario.service";
import {BrSelectComponent} from "../../../../../shared/br-select/br-select.component";
import Swal from "sweetalert2";

@Component({
   selector: 'pnip-admin-form-representante-unidade',
   templateUrl: './form-representante-unidade.component.html',
   styleUrls: [],
   providers: [CepService]
})
export class FormRepresentanteUnidadeComponent implements OnInit {

   @Output() emitirForm = new EventEmitter<FormGroup>();
   public formGroup2: FormGroup;

   novoUser: boolean = false;
   usuarios: Usuario[] = [];
   newUsuario: Usuario = new Usuario();
   @Output() newUserEmitter: EventEmitter<Usuario> = new EventEmitter<Usuario>();
   @ViewChild('userSelect', {static: false}) userSelect!: BrSelectComponent;
   users: any = [];
   constructor(private fb: FormBuilder,
               private usuarioService: UsuarioService) {
      this.formGroup2 = this.fb.group({
         nome: [this.newUsuario?.nome, [Validators.required, Validators.maxLength(100)]],
         cpf: [this.newUsuario?.cpf, [Validators.required, cpfValidator()]],
         email: [this.newUsuario?.email, [Validators.required, Validators.email, Validators.maxLength(70)]],
      });

      // this.formGroup2.valueChanges.subscribe(() => {
      //    this.emitirForm.emit(this.formGroup2);
      //       // });
   }

   ngOnInit() {
      this.usuarioService.findUsuariosDip().subscribe((data) => {
         this.usuarios = data;
         this.usuarios.forEach((user) => {
            this.users.push({label: user.nome + '-' + user.email, value: user.id})
         });
      });
   }

   verificaNovoUser(event: boolean) {
      event ? this.novoUser = true : this.novoUser = false;
   }

   selecionaUsuario(id: number) {
      this.newUsuario = new Usuario();
      this.usuarios.forEach((us) => {
         if (us.id == this.userSelect.getOptionSelected()) {
            this.newUsuario = Object.assign(us);
         }
      })
      console.log(this.newUsuario)
      //this.emitirNovoUsuario();
   }

   adicionarNovoUsuario() {
      let user = new Usuario();
      user.nome = this.formGroup2.get("nome")?.value;
      user.email = this.formGroup2.get("email")?.value;
      user.cpf = this.formGroup2.get("cpf")?.value.toString();
      const permissao: Permissao = { descricao: 'so'};
      user.permissoes.push(permissao);
      this.newUsuario = Object.assign({}, user);
      this.emitirNovoUsuario();
   }

   emitirNovoUsuario() {
      if (this.novoUser) {
         if (!this.formGroup2.valid) {
            Swal.fire('Ops...', 'Dados do usuário incompletos!', 'error').then();
            return;
         }
      }
      if (this.newUsuario != null && this.newUsuario != undefined) {
         this.newUserEmitter.emit(this.newUsuario);
      }
   }
}
