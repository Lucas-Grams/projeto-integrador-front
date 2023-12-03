import {Component} from '@angular/core';

@Component({
   selector: 'pnip-tr-listar-solicitacoes',
   templateUrl: './listar-solicitacoes.component.html',
   styleUrls: ['./listar-solicitacoes.component.css']
})
export class ListarSolicitacoesComponent {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Primeiro acesso',
         url: '/portal-tr/primeiro-acesso'
      },
      {
         label: 'Minhas solicitações',
         active: true
      }
   ];

   constructor() {}

}
