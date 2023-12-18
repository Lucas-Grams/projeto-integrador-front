import {Component, OnInit} from '@angular/core';
import {TrService} from "../../../../core/services/tr.service";
import {SolicitacaoHabilitacaoDTO} from "../../../../core/dtos/solicitacao-habilitacao.dto";
import {LoadingService} from "../../../../core/services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

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

   constructor(private trService: TrService, private loadingService: LoadingService,
               private route: ActivatedRoute, private router: Router, private location: Location) {
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
   }

   visualizar(uuid: string) {
      this.router.navigate(['/portal-tr/primeiro-acesso/detalhes-solicitacao', uuid]);
   }

   voltar() {
      this.router.navigate(['/portal-tr/primeiro-acesso']);
   }

}
