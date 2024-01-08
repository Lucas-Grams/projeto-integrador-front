import {Component, OnInit, ElementRef} from '@angular/core';
import {UnidadeService} from "../../../../core/services/unidade.service";
import {Unidade} from "../../../../core/models/unidade.model";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";


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

   constructor(private unidadeService: UnidadeService,
               private el: ElementRef) {
   }

   ngOnInit() {
      this.unidadeService.findAll().subscribe((data) => {
         this.unidades = data;
      })
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
            this.unidadeService.inativarUnidade(unidade.uuid).subscribe(() => {
               this.el.nativeElement.ownerDocument.defaultView.location.reload();
            });
         }
      })
   }


}
