import {Component} from '@angular/core';
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";

@Component({
   selector: 'pnip-tr-solicitar-acesso',
   templateUrl: './solicitar-acesso.component.html',
   styleUrls: []
})
export class SolicitarAcessoComponent {

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
         label: 'Solicitar Cadastro de Técnico Responsável',
         active: true
      }
   ];

   constructor(private loadingService: LoadingService, private router: Router) {}

   salvar(tr: any) {
      this.loadingService.show = true;
      setTimeout(() => {
         this.loadingService.show = false;
         this.router.navigate(['/portal-tr/primeiro-acesso/minhas-solicitacoes']);
      }, 1200);
      console.log(tr);
   }

}
