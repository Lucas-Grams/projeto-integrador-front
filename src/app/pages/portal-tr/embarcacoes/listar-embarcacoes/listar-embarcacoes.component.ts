import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../../core/services/loading.service";
import {EmbarcacaoService} from "../../../../core/services/embarcacao.service";;
import {EmbarcacaoTRDTO} from "../../../../core/dtos/embarcacao-tr.dto";
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

   public embarcacoes: EmbarcacaoTRDTO[] = [];

   constructor(private embarcacaoService: EmbarcacaoService, private loadingService: LoadingService,
               private route: ActivatedRoute, private router: Router) {
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

}
