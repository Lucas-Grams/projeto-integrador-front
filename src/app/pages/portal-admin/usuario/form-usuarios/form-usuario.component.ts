import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Unidade} from "../../../../core/models/unidade.model";
import {cpfValidator} from "../../../../utils/validators/cpf.validator";
import {Usuario} from "../../../../core/models/usuario.model";
import {UnidadeUsuario} from "../../../../core/models/unidade-usuario.model";
import {UsuarioService} from "../../../../core/services/usuario.service";
import Swal from "sweetalert2";
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";
import {Permissao} from "../../../../core/models/permissao.model";

@Component({
   selector: 'pnip-admin-form-usuario',
   templateUrl: './form-usuario.component.html',
   styleUrls: []

})

export class FormUsuarioComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-admin',
         home: true
      },
      {
         label: 'Usuarios',
         url: '/portal-admin/usuarios'
      },
      {
         label: 'Cadastrar novo Usuario',
         active: true
      }
   ];

   usuario: Usuario = new Usuario();
   formGroup: FormGroup;
   unidades: Unidade[] = [];
   unidadeUsuario: UnidadeUsuario[] = [];


   constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private loadingService: LoadingService, private router: Router) {

      this.formGroup = this.fb.group({
         nome:this.fb.control(this.usuario.nome, [Validators.minLength(2), Validators.maxLength(100), Validators.required]),
         cpf:this.fb.control(this.usuario.cpf, [Validators.required, cpfValidator()]),
         email:this.fb.control(this.usuario.email, [Validators.required, Validators.email, Validators.maxLength(70)])
      });

   }

   ngOnInit() {

   }

   receberUnidade(unidade: Unidade) {
      const jaExiste = this.unidadeUsuario.find(uni => this.comparaUnidades(uni, unidade));
      if (!jaExiste) {
         this.unidades.push(unidade);
         const permissao: Permissao = {id: null, descricao: 'so'};
         let uniUsu = new UnidadeUsuario();
         uniUsu.unidade = unidade;
         uniUsu.usuario = this.usuario;
         uniUsu.permissao.push(permissao);
         uniUsu.ativo = true;
         this.unidadeUsuario.push(uniUsu);
      }
   }

   comparaUnidades(uni1: UnidadeUsuario, uni2: Unidade) {
      return uni1.unidade.uuid == uni2.uuid;
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


   cancelarUnidade(unidade: String) {
      const index = this.unidadeUsuario.findIndex(u => u.unidade.uuid === unidade);
      if (index !== -1) {
         this.unidadeUsuario.splice(index, 1);
      }
   }

   montaObjeto(){
      this.usuario.nome = this.formGroup.get("nome")?.value as String;
      this.usuario.email = this.formGroup.get("email")?.value as String;
      const field = this.formGroup.get('cpf');
      if (!field?.value) return;
      const cpf = field?.value[0];
      this.usuario.cpf = cpf;
   }

   salvar() {
      console.log(this.unidadeUsuario)
      if (this.formGroup.valid) {
         this.montaObjeto()
         if(this.unidadeUsuario.length == 0){
            let uni = new UnidadeUsuario();
            uni.usuario = this.formGroup.value;
            this.unidadeUsuario.push(uni);
         }else {
            this.unidadeUsuario.forEach((uni) => {
               uni.usuario = this.usuario;
            });
         }
         if (this.formGroup.valid) {
            this.usuarioService.salvar(this.unidadeUsuario).subscribe(mensagem => {
               if (mensagem.status === 'SUCCESS' ) {
                  Swal.fire("OK.", 'Usuário cadastrado com sucesso!', 'success').then(()=>{
                     this.loadingService.show = true;
                     this.router.navigate(['/portal-admin/usuarios']);
                     this.loadingService.show = false;
                  });
               }else{
                  this.loadingService.show = false;
                  Swal.fire('Ops.',"Ocorreu um erro ao salvar o usuário, tente novamente mais tarde.", 'error').then();
               }
            });
         } else {
            Swal.fire('Ops...', 'Formulário incompleto!', 'error').then();
         }
      }
   }
}
