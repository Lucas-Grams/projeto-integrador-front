import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SolicitarAcessoComponent} from "./solicitar-acesso/solicitar-acesso.component";
import {ListarSolicitacoesComponent} from "./listar-solicitacoes/listar-solicitacoes.component";
import {PrimeiroAcessoComponent} from "./primeiro-acesso.component";
import {DetalhesSolicitacaoComponent} from "./detalhes-solicitacao/detalhes-solicitacao.component";

const routes: Routes = [
   {
      path: '',
      component: PrimeiroAcessoComponent
   },
   {
      path: 'solicitar',
      component: SolicitarAcessoComponent
   },
   {
      path: 'minhas-solicitacoes',
      component: ListarSolicitacoesComponent
   },
   {
      path: 'detalhes-solicitacao/:uuid',
      component: DetalhesSolicitacaoComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class PrimeiroAcessoRoutingModule {}
