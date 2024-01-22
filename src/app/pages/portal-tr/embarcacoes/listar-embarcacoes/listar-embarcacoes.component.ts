import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {TrService} from "../../../../core/services/tr.service";
import {LoadingService} from "../../../../core/services/loading.service";
import {EmbarcacaoService} from "../../../../core/services/embarcacao.service";

import {EmbarcacaoTRDTO} from "../../../../core/dtos/embarcacao-tr.dto";

import Swal from "sweetalert2";
import {PdfUtils} from "../../../../utils/components/pdf.utils";

@Component({
   selector: 'pnip-tr-listar-embarcacoes',
   templateUrl: './listar-embarcacoes.component.html',
   styleUrls: [],
})
export class ListarEmbarcacoesComponent {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Embarcações',
         url: '/portal-tr/embarcacoes'
      },
      {
         label: 'Minhas embarcações',
         active: true
      }
   ];

   public modal: any;
   public embarcacao: any = {};
   public uuidVinculoEmbarcacao = '';
   public embarcacoes: EmbarcacaoTRDTO[] = [];

   constructor(private embarcacaoService: EmbarcacaoService, private loadingService: LoadingService,
               private route: ActivatedRoute, private router: Router, private trService: TrService) {
      this.findAll();
   }

   findAll() {
      this.loadingService.show = true;
      this.embarcacaoService.minhasEmbarcacoes().subscribe((embarcacoes: EmbarcacaoTRDTO[]) => {
         this.embarcacoes = embarcacoes;
         this.loadingService.show = false;
      });
   }

   verDeclaracaoProprietario(uuid: string) {
      this.embarcacaoService.downloadDeclaracaoProprietario(uuid).subscribe(response => {
         const blob = new Blob([response], {type: 'application/pdf'});
         const blobUrl = URL.createObjectURL(blob);
         PdfUtils.openViewer(blobUrl);
      }, error => {
         Swal.fire('Erro.', 'Arquivo não encontrado', 'error').then();
      });
   }

   visualizar(uuid: string) {
      this.router.navigate(['/portal-tr/embarcacoes/detalhes-embarcacao', uuid]);
   }

   novaEmbarcacao() {
      this.router.navigate(['/portal-tr/embarcacoes/cadastrar']);
   }

   voltar() {
      this.router.navigate(['/portal-tr']);
   }

   desvincularEmbarcacao(uuidVinculoEmbarcacao: string) {
      this.trService.desvincularEmbarcacao(uuidVinculoEmbarcacao).subscribe(response => {
         Swal.fire('Ok.',response.msg, 'success').then();
         this.modal.hideScrim();
         this.findAll();
      });
   }

   showModal(embarcacao: any, uuidVinculoEmbarcacao: string) {
      Swal.fire({
         title: 'Atenção.',
         text: `Esta ação vai excluir o seu vínculo com a embarcação ${embarcacao.nome}
         A embarcação pode ser cadastrada novamente no futuro.`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Sim',
         cancelButtonText: 'Não'
      }).then((result) => {
         if (result.value) {
            this.desvincularEmbarcacao(uuidVinculoEmbarcacao);
         }
      });
   }

}
