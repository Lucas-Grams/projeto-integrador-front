import {Component, Input, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import {TrService} from "../../../../core/services/tr.service";

@Component({
   selector: 'pnip-mpa-list-solicitacoes',
   templateUrl: './list-solicitacoes.component.html'
})
export class ListSolicitacoesComponent implements OnInit {

   solicitacoes: any = [];
   solicitacao: any;

   @Input('statusSolicitacao') statusSolicitacao: string | null = null;

   constructor(private trService: TrService, private router: Router) {

   }

   ngOnInit(): void {
      this.findAllSolicitacoes();
   }

   findAllSolicitacoes() {
      console.log(this.statusSolicitacao)
      if (this.statusSolicitacao === 'EM_ANALISE') {
         this.trService.findSolicitacoesByStatus(this.statusSolicitacao).subscribe((response: any) => {
            this.solicitacoes = response.data;
         });
      } else {
         this.trService.findAllSolicitacoes().subscribe((response: any) => {
            this.solicitacoes = response.data;
         });
      }
   }

   findSolicitacao(uuid: string) {
      this.router.navigate([`/portal-mpa/solicitacoes/solicitacao/${uuid}`]);
   }

   getClass(status: string): string {
      switch (status) {
         case 'EM_ANALISE':
            return 'bg-secondary-06';
         case 'DEFERIDA':
            return 'bg-success';
         case 'INDEFERIDA':
            return 'bg-danger';
         default:
            return 'bg-secondary-06';
      }
   }

}
