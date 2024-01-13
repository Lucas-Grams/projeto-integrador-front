import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../../core/services/loading.service";
import {TrService} from "../../../../core/services/tr.service";
import {HabilitarTRDTO} from "../../../../core/dtos/habilitar-tr.dto";
import {PdfUtils} from "../../../../utils/components/pdf.utils";

@Component({
   selector: 'pnip-tr-detalhes-solicitacao',
   templateUrl: './detalhes-solicitacao.component.html',
   styleUrls: [],
})
export class DetalhesSolicitacaoComponent implements OnInit {

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
         url: '/portal-tr/primeiro-acesso/minhas-solicitacoes'
      },
      {
         label: 'Detalhes da solicitação',
         active: true
      }
   ];

   public uuid!: string;
   public solicitacao!: HabilitarTRDTO;

   constructor(private trService: TrService, private loadingService: LoadingService,
               private route: ActivatedRoute, private router: Router) {}

   ngOnInit() {
      this.route.params.subscribe((params) => {
         const uuid = params['uuid'];
         if (uuid) {
            this.uuid = uuid;
            this.getDetalhesSolicitacao(uuid);
         } else {
            this.voltar();
         }
      });
   }

   private getDetalhesSolicitacao(uuid: string) {
      this.loadingService.show = true;
      this.trService.detalhesSolicitacao(uuid).subscribe((solicitacao: HabilitarTRDTO) => {
         this.loadingService.show = false;
         this.solicitacao = solicitacao;
         if (!solicitacao) {
            this.voltar();
         }
      });
   }

   verPdf(filename: string) {
      this.trService.downloadAnexo(this.uuid, filename).subscribe(response => {
         const blob = new Blob([response], {type: 'application/pdf'});
         const blobUrl = URL.createObjectURL(blob);
         PdfUtils.openViewer(blobUrl);
      });
   }

   voltar() {
      this.router.navigate(['/portal-tr/primeiro-acesso/minhas-solicitacoes']);
   }

}
