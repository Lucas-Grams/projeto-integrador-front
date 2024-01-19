declare var core: any;

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {TrService} from "../../../../core/services/tr.service";
import {PdfUtils} from "../../../../utils/components/pdf.utils";

@Component({
   selector: 'pnip-mpa-view-solicitacao',
   templateUrl: './view-solicitacao.component.html',
   styleUrls: ['./view-solicitacao.component.scss']
})
export class ViewSolicitacaoComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-mpa',
         home: true
      },
      {
         label: 'Processos',
         url: '/portal-mpa/solicitacoes'
      },
      {
         label: 'Detalhes da solicitação',
         url: '/portal-mpa/solicitacoes'
      }
   ];

   metadado: any;
   solicitacao: any;
   msgIndeferir = '';
   responseOperacao = '';
   statusSolicitacao = '';
   showMessage = false;

   constructor(private trService: TrService, private route: ActivatedRoute, public router: Router) {

   }

   ngOnInit() {
      this.route.params.subscribe(params => {
         if (params && params["uuid"]) {
            this.findSolicitacaoByUuid(params["uuid"]);
         } else {
            console.error("Nenhuma solicitação encontrada");
         }
      });
   }

   findSolicitacaoByUuid(uuid: string) {
      this.trService.findSolicitacaoByUuid(uuid).subscribe((response: any) => {
         this.solicitacao = response.data;

         this.metadado = JSON.parse(this.solicitacao.metadado);
      });
   }

   enviarSolicitacao() {
      this.responseOperacao = '';
      if (this.statusSolicitacao === 'deferir') {
         const numEmbaracao = this.metadado?.habilitarTRDTO?.embarcacoes.length;
         let count = 0;
         this.metadado?.habilitarTRDTO?.embarcacoes.forEach((embarcacao: any) => {
            if (embarcacao.aprovada || embarcacao.aprovada === false) {
               count++;
            }
         });

         if (count !== numEmbaracao) {
            this.showMessage = true;
            return;
         }
      }

      let embarcacoes: any = [];
      this.metadado?.habilitarTRDTO?.embarcacoes.forEach((embarcacao: any) => {
         if (embarcacao.aprovada || embarcacao.aprovada === false) {
            embarcacoes.push({id: embarcacao.id, aprovado: embarcacao.aprovada});
         }
      });

      const finalizarSolicitacao = {
         uuidSolicitacao: this.solicitacao.uuidSolicitacao,
         statusSolicitacao: this.statusSolicitacao,
         msgSolicitacao: (this.statusSolicitacao === 'deferir'? '' : this.msgIndeferir),
         embarcacoes: embarcacoes
      }

      this.trService.finalizarSolicitacao(finalizarSolicitacao).subscribe(response => {
         if (response) {
            this.router.navigate(['portal-mpa/solicitacoes']);
         }
      }, (responseError: any) => {
         this.responseOperacao = responseError.error.message;
      });
   }

   verPdf(filename: string) {
      this.trService.downloadAnexo(this.solicitacao.uuidSolicitacao, filename).subscribe(response => {
         const blob = new Blob([response], {type: 'application/pdf'});
         const blobUrl = URL.createObjectURL(blob);
         PdfUtils.openViewer(blobUrl);
      });
   }

   showModal(modalId: string, close: string) {
      const modal: any = document.getElementById("modal-" + modalId);
      const scrimfoco = new core.Scrim({
         closeElement: close,
         trigger: modal,
      });
      scrimfoco.showScrim();
   }

}
