import {Component} from "@angular/core";

@Component({
   selector: 'pnip-mpa-solicitacoes',
   templateUrl: './solicitacoes.component.html'
})
export class SolicitacoesComponent {

   statusSolicitacao = 'EM_ANALISE';

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-mpa',
         home: true
      },
      {
         label: 'Processos',
         url: '/portal-mpa/solicitacoes',
         active: true
      }
   ];

   constructor() {}

   onTabItemClick(event: any) {
      if (event && event.detail && event.detail[0].id === 'panel-1') {
         this.statusSolicitacao = 'EM_ANALISE';
      } else {
         this.statusSolicitacao = 'ALL';
      }
   }

}
