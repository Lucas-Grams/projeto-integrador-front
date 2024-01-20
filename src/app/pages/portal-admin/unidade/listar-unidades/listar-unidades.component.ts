import {Component, OnInit, ElementRef} from '@angular/core';
import {UnidadeService} from "../../../../core/services/unidade.service";
import {Unidade} from "../../../../core/models/unidade.model";
import Swal from "sweetalert2";
import {UsuarioService} from "../../../../core/services/usuario.service";


@Component({
   selector: 'pnip-admin-listar-unidades',
   templateUrl: './listar-unidades.component.html',
   styleUrls: []
})
export class ListarUnidadesComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-admin',
         home: true
      },
      {
         label: 'Unidades',
         active: true
      }
   ];

   unidades: Unidade[] = [];

   constructor(private unidadeService: UnidadeService, private usuarioService: UsuarioService,
               private el: ElementRef) {
   }

   ngOnInit() {
      this.unidadeService.findAll().subscribe((data) => {
         this.unidades = data;
         this.unidades.forEach((uni)=>{
            this.usuarioService.findUsuariosUnidade(uni.uuid).subscribe((data) => {
               uni.usuarios = data;
            });
         });

      });
   }

   inativar(unidade: Unidade) {
      console.log(unidade);
      Swal.fire({
         title: 'Ops...',
         text: `Você tem certeza que deseja  ${unidade.ativo? 'inativar' : 'ativar'} essa unidade?`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Sim',
         cancelButtonText: 'Não'
      }).then((result) => {
         if (result.value) {
            if(unidade.tipo == 'UC' || unidade.tipo == 'MPA'){
               Swal.fire({
                  title: 'Erro!',
                  text: `Esta unidade não pode ser desativada por ser uma ${unidade.tipo}.`,
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: 'OK'
               }).then(()=>this.el.nativeElement.ownerDocument.defaultView.location.reload());
            }else if(unidade.usuarios != null && unidade.ativo){
               Swal.fire({
                  title: 'Erro!',
                  text: `Esta unidade não pode ser desativada por existirem usuários vinculados.`,
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: 'OK'
               }).then(()=>this.el.nativeElement.ownerDocument.defaultView.location.reload());
            }else {
               this.unidadeService.inativarUnidade(unidade.uuid).subscribe(() => {
                  this.el.nativeElement.ownerDocument.defaultView.location.reload();
               });
            }
         }
      })
   }


}
