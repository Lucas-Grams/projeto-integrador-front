import {Component, OnInit, ElementRef} from '@angular/core';
import {UnidadeService} from "../../../../core/services/unidade.service";
import {Unidade} from "../../../../core/models/unidade.model";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {UsuarioService} from "../../../../core/services/usuario.service";
import {Usuario} from "../../../../core/models/usuario.model";


@Component({
   selector: 'pnip-admin-listar-usuarios',
   templateUrl: './listar-usuarios.component.html',
   styleUrls: []
})
export class ListarUsuariosComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-admin',
         home: true
      },
      {
         label: 'Usuários',
         active: true
      }
   ];

   usuarios: Usuario[] = [];
   unidades: Unidade[] = [];

   constructor(private unidadeService: UnidadeService, private usuarioService: UsuarioService,
               private el: ElementRef) {
   }

   ngOnInit() {
      this.usuarioService.findAll().subscribe((data) => {
         this.usuarios = data;
      });
   }

   inativar(usuario: Usuario) {
      Swal.fire({
         title: 'Ops...',
         text: `Você tem certeza que deseja  ${usuario.ativo? 'inativar' : 'ativar'} essa unidade?`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Sim',
         cancelButtonText: 'Não'
      }).then((result) => {
         if (result.value) {
            if(true){
               Swal.fire({
                  title: 'Erro!',
                  text: `Esta unidade não pode ser desativada por ser uma ${usuario.nome}.`,
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: 'OK'
               }).then(()=>this.el.nativeElement.ownerDocument.defaultView.location.reload());
            }else if(usuario != null){
               Swal.fire({
                  title: 'Erro!',
                  text: `Esta unidade não pode ser desativada por existirem usuários vinculados.`,
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: 'OK'
               }).then(()=>this.el.nativeElement.ownerDocument.defaultView.location.reload());
            }else {
               // this.unidadeService.inativarUnidade(usuario.uuid).subscribe(() => {
               //    this.el.nativeElement.ownerDocument.defaultView.location.reload();
               // });
            }
         }
      })
   }


}
