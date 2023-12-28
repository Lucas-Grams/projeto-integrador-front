import {Component} from '@angular/core';

@Component({
   selector: 'pnip-mpa-principal',
   templateUrl: './principal.component.html',
   styleUrls: []
})
export class PrincipalComponent {

   public menuItems = [
      {
         label: 'PROCESSOS',
         icon: 'list',
         url: '/portal-mpa/solicitacoes'
      },
      // {
      //    label: 'EMBARCAÇÔES',
      //    icon: 'ship',
      //    url: ''
      // },
      // {
      //    label: 'RESPONSÁVEIS TÉCNICOS',
      //    icon: 'users',
      //    url: ''
      // },
   ];

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-mpa',
         home: true
      },
      {
         label: 'Dashboard',
         url: '/portal-mpa'
      }
   ];

}
