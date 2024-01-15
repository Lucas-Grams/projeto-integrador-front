import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Unidade} from "../../../../core/models/unidade.model";
import {cpfValidator} from "../../../../utils/validators/cpf.validator";
import {Permissao, Usuario} from "../../../../core/models/usuario.model";

@Component({
   selector: 'pnip-admin-form-usuairo',
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

   constructor(private fb: FormBuilder) {

      this.formGroup = this.fb.group({
            nome:this.fb.control(this.usuario.nome, [Validators.minLength(2), Validators.maxLength(100), Validators.required]),
            cpf:this.fb.control(this.usuario.cpf, [Validators.required, cpfValidator()]),
            email:this.fb.control(this.usuario.email, [Validators.required, Validators.email, Validators.maxLength(70)])
      });

   }

   ngOnInit() {

   }

   receberUnidade(unidade: Unidade) {

      const jaExiste = this.unidades.find(uni=> this.comparaUnidades(uni, unidade));
      if (!jaExiste) {
          this.unidades.push(unidade);
      }
   }

   comparaUnidades(uni1: Unidade, uni2: Unidade) {
      return uni1.uuid == uni2.uuid;
   }

   //usuarioIsRepresentante(user: Usuario): void {
      // const permissao: Permissao = {id: null, descricao: 'representante'};
      // if (!user.permissoes) {
      //    user.permissoes = [];
      // }
      // const permissaoIndex: number = user.permissoes.findIndex((perm) => perm.descricao === 'representante');
      // if (permissaoIndex === -1) {
      //    // Se o usuário não tem a permissão, adiciona
      //    user.permissoes.splice(0, 0, permissao);
      // } else {
      //    // Se o usuário já tem a permissão, remove
      //    user.permissoes.splice(permissaoIndex, 1);
      // }
  // }

   // isRepresentante(user: Usuario): boolean {
   //    // if (user.permissoes && user.permissoes.length > 0) {
   //    //    for (const perm of user.permissoes) {
   //    //       if (perm.descricao === 'representante') {
   //    //          return true;
   //    //       }
   //    //    }
   //    // }
   //    // return false;
   // }


   cancelarUnidade(unidade: String) {
      const index = this.unidades.findIndex(u => u.uuid === unidade);
      if (index !== -1) {
         this.unidades.splice(index, 1);
      }
   }

   salvar() {
      if (this.formGroup.valid) {
         this.usuario = this.formGroup.value;
         console.log(this.usuario)
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
