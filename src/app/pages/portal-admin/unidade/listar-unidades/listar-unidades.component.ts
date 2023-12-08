import {Component} from '@angular/core';

@Component({
   selector: 'pnip-admin-listar-unidades',
   templateUrl: './listar-unidades.component.html',
   styleUrls: []
})
export class ListarUnidadesComponent {

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

   constructor() {}

}
