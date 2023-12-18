import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'pnip-tr-primeiro-acesso',
   templateUrl: './primeiro-acesso.component.html',
   styleUrls: []
})
export class PrimeiroAcessoComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Primeiro acesso',
         active: true
      }
   ];

   public menuItems = [
      {
         label: 'SOLICITAR HABILITAÇÃO',
         icon: 'ship',
         url: '/solicitar'
      },
      {
         label: 'MINHAS SOLICITAÇÕES',
         icon: 'list',
         url: '/minhas-solicitacoes'
      },
   ];

   constructor() {}

   ngOnInit() {
      // TODO: se houver solicitação, redirecionar para 'minhas-solicitacoes'
      // this.router.navigate(['/portal-tr/primeiro-acesso/solicitar']);
   }

}
