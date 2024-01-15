import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Unidade} from "../../../../../core/models/unidade.model";
import {cpfValidator} from "../../../../../utils/validators/cpf.validator";
import {Permissao, Usuario} from "../../../../../core/models/usuario.model";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../../../../core/services/usuario.service";
import {UnidadeUsuario} from "../../../../../core/models/UnidadeUsuario.model";

@Component({
   selector: 'pnip-admin-form-editar-usuairo',
   templateUrl: './form-editar-usuario.component.html',
   styleUrls: []

})

export class FormEditarUsuarioComponent implements OnInit {

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
         label: 'Editar Usuario',
         active: true
      }
   ];
   usuario: Usuario = new Usuario();
   formGroup: FormGroup;
   unidades: Unidade[] = [];
   uuid: String = '';
   unidadeUsuario: UnidadeUsuario[] = [];

   constructor(private fb: FormBuilder, private route: ActivatedRoute, private usuarioService: UsuarioService) {
      this.route.params.subscribe((param) => {
         this.uuid = param['uuid'];
      });

      this.usuarioService.findByUuid(this.uuid).subscribe((data) => {
         this.usuario = data;
      });

         this.usuarioService.findUnidadesByUsuarioUuid(this.uuid).subscribe((data) => {
            this.unidadeUsuario = data;
            this.filterUnidadesUsuario(this.unidadeUsuario);
         });


      this.formGroup = this.fb.group({
         nome: this.fb.control(this.usuario.nome, [Validators.minLength(2), Validators.maxLength(100), Validators.required]),
         cpf: this.fb.control(this.usuario.cpf, [Validators.required, cpfValidator()]),
         email: this.fb.control(this.usuario.email, [Validators.required, Validators.email, Validators.maxLength(70)])
      });

   }

   ngOnInit() {
   }

   filterUnidadesUsuario(vinculos: UnidadeUsuario[]) {
      let vinculosFiltrados: UnidadeUsuario[] = [];

      vinculos.forEach((uni) => {
         // Verifica se vinculosFiltrados não está vazio
         if (vinculosFiltrados.length === 0) {
            vinculosFiltrados.push(uni);
         } else {
            // Encontra o índice do elemento com a mesma unidade.id
            let i = vinculosFiltrados.findIndex((item) => item.unidade.id === uni.unidade.id);

            if (i === -1) {
               // Se não encontrar, adiciona uma nova entrada
               vinculosFiltrados.push(uni);
            } else {
               // Se encontrar, adiciona a permissão ao array existente
               vinculosFiltrados[i].permissao.push(...uni.permissao);
            }
         }
      });
      this.unidadeUsuario = [];
      this.unidadeUsuario = vinculosFiltrados;
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
         // Se o usuário não tem a permissão, adiciona
         uni.permissao.splice(0, 0, permissao);
      } else {
         // Se o usuário já tem a permissão, remove
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

   salvar() {
      console.log(this.unidadeUsuario)
      if (this.formGroup.valid) {
         this.usuario = this.formGroup.value;
         console.log(this.unidadeUsuario)
         // if (this.formGroup.valid) {
         //    this.unidadeService.salvar(this.unidade).subscribe(mensagem => {
         //       if (mensagem.status === 'SUCCESS' ) {
         //          Swal.fire("OK.", 'Unidade cadastrada com sucesso!', 'success').then(()=>{
         //             this.loadingService.show = true;
         //             this.router.navigate(['/portal-admin/unidades']);
         //             this.loadingService.show = false;
         //          });
         //       }else{
         //          this.loadingService.show = false;
         //          Swal.fire('Ops.',"Ocorreu um erro ao salvar a unidade, tente novamente mais tarde.", 'error').then();
         //       }
         //    });
         // } else {
         //    Swal.fire('Ops...', 'Formulário incompleto!', 'error').then();
         // }
      }
   }
}
