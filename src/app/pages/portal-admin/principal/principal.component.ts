import {Component} from '@angular/core';

@Component({
   selector: 'pnip-admin-principal',
   templateUrl: './principal.component.html',
   styleUrls: []
})
export class PrincipalComponent {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-admin',
         home: true
      },
      {
         label: 'Principal',
         active: true
      }
   ];

   public menuItems = [
      {
         label: 'UNIDADES',
         icon: 'building',
         url: '/unidades'
      }
   ];

   constructor() {}

}
