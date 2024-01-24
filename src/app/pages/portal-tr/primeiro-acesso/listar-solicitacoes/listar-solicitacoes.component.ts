import {Component, OnInit} from '@angular/core';
import {TrService} from "../../../../core/services/tr.service";
import {SolicitacaoHabilitacaoDTO} from "../../../../core/dtos/solicitacao-habilitacao.dto";
import {LoadingService} from "../../../../core/services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseDTO} from "../../../../core/dtos/response.dto";

@Component({
   selector: 'pnip-tr-listar-solicitacoes',
   templateUrl: './listar-solicitacoes.component.html',
   styleUrls: ['./listar-solicitacoes.component.css']
})
export class ListarSolicitacoesComponent implements OnInit {

   public showMessage = false;

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Primeiro acesso',
         url: '/portal-tr/primeiro-acesso'
      },
      {
         label: 'Minhas solicitações',
         active: true
      }
   ];
   public solicitacoes: SolicitacaoHabilitacaoDTO[] = [];
   public ultimoSolicitacao: null | SolicitacaoHabilitacaoDTO = null;
   public isIndeferida: boolean = true;

   constructor(private trService: TrService, private loadingService: LoadingService,
               private route: ActivatedRoute, private router: Router) {
      this.loadingService.show = true;
      this.trService.minhasSolicitacoes().subscribe((solicitacoes: SolicitacaoHabilitacaoDTO[]) => {
         this.solicitacoes = solicitacoes;
         this.loadingService.show = false;
      });
   }

   ngOnInit() {
      this.route.queryParams.subscribe(params => {
         if (params['message']) {
            this.showMessage = true;
         }
      });
      this.findUltimaSolicitacao();
   }

   findUltimaSolicitacao() {
      this.trService.findUltimaSolicitacao().subscribe((response: ResponseDTO<SolicitacaoHabilitacaoDTO>) => {
         if (response && response.data) {
            this.ultimoSolicitacao = response.data;
            this.isIndeferida = this.ultimoSolicitacao?.status === 'INDEFERIDA';
         }
      });
   }

   visualizar(uuid: string) {
      this.router.navigate(['/portal-tr/primeiro-acesso/detalhes-solicitacao', uuid]);
   }

   novaSolicitacao() {
      this.router.navigate(['/portal-tr/primeiro-acesso/solicitar']);
   }

}
