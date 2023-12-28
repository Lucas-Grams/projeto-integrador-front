import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {MpaComponent} from "./mpa.component";

const routes: Routes = [
   {
      path: '',
      component: MpaComponent,
      children: [
         {
            path: '',
            loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule)
         },
         {
            path: 'solicitacoes',
            loadChildren: () => import('./solicitacoes/solicitacoes.module').then(m => m.SolicitacoesModule)
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class MpaRoutingModule {}
