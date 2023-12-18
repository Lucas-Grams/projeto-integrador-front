import {Component, OnInit, ElementRef} from '@angular/core';
import {UnidadeService} from "../../../../core/services/unidade.service";
import {Unidade} from "../../../../core/models/unidade.model";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

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

   constructor(private unidadeService: UnidadeService,
               private el: ElementRef) {}

   ngOnInit() {
      this.unidadeService.findAll().subscribe((data) =>{
         this.unidades = data;
      })
   }

   excluir(uuid: String){
      this.unidadeService.excluirUnidade(uuid).subscribe(()=> {
         this.el.nativeElement.ownerDocument.defaultView.location.reload();
      })
   }

}
