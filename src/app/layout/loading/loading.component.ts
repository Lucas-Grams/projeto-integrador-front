import {Component} from '@angular/core';

@Component({
   selector: 'pnip-loading',
   template: `
      <div class="d-flex justify-content-md-center align-items-center" style="height: 80vh;">
         <br-loading label="Carregando ..." medium=""></br-loading>
      </div>
   `,
})
export class LoadingComponent {}
