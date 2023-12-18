import {Component, OnInit} from '@angular/core';
import {UnidadeService} from "../../../../core/services/unidade.service";
import {Unidade} from "../../../../core/models/unidade.model";

@Component({
   selector: 'pnip-admin-listar-unidades',
   templateUrl: './listar-unidades.component.html',
   styleUrls: []
})
export class ListarUnidadesComponent implements OnInit{

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

   constructor(private unidadeService: UnidadeService) {}

   ngOnInit() {
      this.unidadeService.findAll().subscribe((data) =>{
         this.unidades = data;
      })
   }

}
