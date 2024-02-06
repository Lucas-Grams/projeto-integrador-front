import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import Swal from "sweetalert2";

import {TrService} from "../../../../core/services/tr.service";
import {PdfUtils} from "../../../../utils/components/pdf.utils";
import {LoadingService} from "../../../../core/services/loading.service";

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
         url: '/portal-mpa/solicitacoes',
         active: true
      }
   ];

   metadado: any;
   solicitacao: any;
   msgIndeferir = '';
   responseOperacao = '';
   statusSolicitacao = '';

   constructor(private trService: TrService, private loadingService: LoadingService, private route: ActivatedRoute,
               public router: Router) {}

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
      this.loadingService.show = true;
      this.trService.findSolicitacaoByUuid(uuid).subscribe((response: any) => {
         this.solicitacao = response.data;
         this.metadado = JSON.parse(this.solicitacao.metadado);
         this.loadingService.show = false;
      });
   }

   enviarSolicitacao() {
      this.responseOperacao = '';

      const finalizarSolicitacao = {
         uuidSolicitacao: this.solicitacao.uuidSolicitacao,
         statusSolicitacao: this.statusSolicitacao,
         msgSolicitacao: (this.statusSolicitacao === 'deferir'? '' : this.msgIndeferir)
      }

      this.loadingService.show = true;
      this.trService.finalizarSolicitacao(finalizarSolicitacao).subscribe(response => {
         if (response) {
            this.loadingService.show = false;
            this.router.navigate(['portal-mpa/solicitacoes']);
         }
      }, (responseError: any) => {
         this.responseOperacao = responseError.error.message;
         this.loadingService.show = false;
      });
   }

   verPdf(filename: string) {
      this.trService.downloadAnexo(this.solicitacao.uuidSolicitacao, filename).subscribe(response => {
         const blob = new Blob([response], {type: 'application/pdf'});
         const blobUrl = URL.createObjectURL(blob);
         PdfUtils.openViewer(blobUrl);
      });
   }

   confirmarOperacao(opcao: string) {
      if (opcao === 'deferir') {
         Swal.fire({
            title: 'Deferir a solicitação de habilitação',
            text: `Esta opção aprova a solicitação do habilitação de TR, para o Técnico Responsável - ${this.metadado?.habilitarTRDTO?.nome} \n
                  Você pode suspender este credenciamento a qualquer momento acessando a opção Técnicos Responsáveis, na home do portal`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Deferir'
         }).then((result) => {
            if (result.value) {
               this.statusSolicitacao = opcao;
               this.enviarSolicitacao();
            }
         });
      } else {
         Swal.fire({
            input: "text",
            title: 'Indeferir solicitação',
            text: `Esta opção encerra o processo para habilitação do TR. \n
                   Se necessário, informe, no campo abaixo, o(s) motivo(s) do indeferimento.`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Indeferir'
         }).then((result) => {
            if (result.isConfirmed) {
               this.statusSolicitacao = opcao;
               this.msgIndeferir = result.value;
               this.enviarSolicitacao();
            }
         });
      }
   }

}
