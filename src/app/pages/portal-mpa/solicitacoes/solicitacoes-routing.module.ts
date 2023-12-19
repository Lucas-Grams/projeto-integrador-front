import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {SolicitacoesComponent} from "./solicitacoes.component";
import {ViewSolicitacaoComponent} from "./view-solicitacao/view-solicitacao.component";

const routes: Routes = [
   {
      path: '',
      component: SolicitacoesComponent
   },
   {
      path: 'solicitacao/:uuid',
      component: ViewSolicitacaoComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class SolicitacoesRoutingModule {}
