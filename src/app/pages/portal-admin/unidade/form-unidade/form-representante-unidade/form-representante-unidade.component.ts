import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {CepService} from "../../../../../core/services/cep.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {cpfValidator} from "../../../../../utils/validators/cpf.validator";
import {cepValidator} from "../../../../../utils/validators/cep.validator";
import {Usuario} from "../../../../../core/models/usuario.model";
import {UsuarioService} from "../../../../../core/services/usuario.service";
import {BrSelectComponent} from "../../../../../shared/br-select/br-select.component";
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
   @ViewChild('userSelect', {static: false}) userSelect!: BrSelectComponent;
   users:any = [];
   @Input() isEdit?:boolean;
   @Input() uuid?:String;

   constructor(private fb: FormBuilder,
               private cepService: CepService,
               private usuarioService: UsuarioService) {
      this.formGroup2 = this.fb.group({
         nome: [this.newUsuario?.nome, [Validators.required, Validators.maxLength(100)]],
         cpf: [this.newUsuario?.cpf, [Validators.required, cpfValidator()]],
         email: [this.newUsuario?.email, [Validators.required, Validators.email, Validators.maxLength(70)]],
      });

      // this.formGroup2.valueChanges.subscribe(() => {
      //    this.emitirForm.emit(this.formGroup2);
      // });
   }

   ngOnInit() {
      if(this.isEdit) {
         this.usuarioService.findRepresentantesUnidade(this.uuid).subscribe((data) => {
            this.usuarios = data;
            this.usuarios.forEach((user) => {
               this.users.push({label: user.nome + '-' + user.email, value: user.id})
            });
         });
      }
   }

   // getAddressByCep() {
   //    const field = this.formGroup2.get('cep');
   //    if (!field?.value) return;
   //    const cep = field?.value[0];
   //    if (cep.length === 9) {
   //       this.cepService.getAddrress(cep).subscribe(response => {
   //          if (response && !response.erro) {
   //             this.formGroup2.get('rua')?.setValue(response.logradouro);
   //             this.formGroup2.get('cidade')?.setValue(response.localidade);
   //             this.formGroup2.get('uf')?.setValue(response.uf);
   //          }
   //       });
   //    }
   // }

   verificaNovoUser(event: boolean){
      event? this.novoUser = true: this.novoUser = false;
   }

   selecionaUsuario(id: number){
      console.log("parte 3")
      console.log(this.newUsuario)
      this.newUsuario = new Usuario();
      this.usuarios.forEach((us) => {
         if(us.id == this.userSelect.getOptionSelected()){
            this.newUsuario = us;
         }
      })
      console.log(this.newUsuario)
      //this.emitirNovoUsuario();
   }

   adicionarNovoUsuario(){
      console.log("parte 4")
      console.log(this.newUsuario)
      let user = new Usuario();
      user.nome = this.formGroup2.get("nome")?.value;
      user.email = this.formGroup2.get("email")?.value;
      user.cpf = this.formGroup2.get("cpf")?.value;
      this.newUsuario = user;
      console.log(this.newUsuario)
      this.emitirNovoUsuario();
   }

   emitirNovoUsuario() {
      if(this.novoUser){
         this.newUsuario = this.formGroup2.value;
      }
      if(this.newUsuario != null && this.newUsuario != undefined){
         this.newUserEmitter.emit(this.newUsuario);
      }
   }
}
