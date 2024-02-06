import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {TrService} from "../../../../core/services/tr.service";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
   selector: 'pnip-mpa-list-solicitacoes',
   templateUrl: './list-solicitacoes.component.html'
})
export class ListSolicitacoesComponent implements OnInit {

   solicitacoes: any = [];
   solicitacao: any;

   @Input('statusSolicitacao') statusSolicitacao: string | null = null;

   constructor(private trService: TrService, private loadingService: LoadingService, private router: Router) {}

   ngOnInit(): void {
      this.findAllSolicitacoes();
   }

   findAllSolicitacoes() {
      this.loadingService.show = true;
      const listStatus: any = (this.statusSolicitacao === 'EM_ANALISE')? ['EM_ANALISE']: ['DEFERIDA', 'INDEFERIDA'];
      this.trService.findSolicitacoesByStatus(listStatus).subscribe((response: any) => {
         this.solicitacoes = response.data;
         this.loadingService.show = false;
      });
   }

   findSolicitacao(uuid: string) {
      this.router.navigate([`/portal-mpa/solicitacoes/solicitacao/${uuid}`]);
   }

}
