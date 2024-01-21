import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../../core/services/loading.service";
import {EmbarcacaoService} from "../../../../core/services/embarcacao.service";;
import {EmbarcacaoTRDTO} from "../../../../core/dtos/embarcacao-tr.dto";
import {PdfUtils} from "../../../../utils/components/pdf.utils";

@Component({
   selector: 'pnip-tr-detalhes-embarcacao',
   templateUrl: './detalhes-embarcacao.component.html',
   styleUrls: [],
})
export class DetalhesEmbarcacaoComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Minhas embarcações',
         url: '/portal-tr/embarcacoes'
      },
      {
         label: 'Detalhes da embarcação',
         active: true
      }
   ];

   public uuid!: string;
   public embarcacao!: EmbarcacaoTRDTO;

   constructor(private embarcacaoService: EmbarcacaoService, private loadingService: LoadingService,
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
      this.embarcacaoService.detalhesEmbarcacao(uuid).subscribe((embarcacao: EmbarcacaoTRDTO) => {
         this.loadingService.show = false;
         this.embarcacao = embarcacao;
         if (!embarcacao) {
            this.voltar();
         }
      });
   }

   verDeclaracaoProprietario(uuid: string) {
      this.embarcacaoService.downloadDeclaracaoProprietario(uuid).subscribe(response => {
         const blob = new Blob([response], {type: 'application/pdf'});
         const blobUrl = URL.createObjectURL(blob);
         PdfUtils.openViewer(blobUrl);
      });
   }

   voltar() {
      this.router.navigate(['/portal-tr/embarcacoes']);
   }

}
