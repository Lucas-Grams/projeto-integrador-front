import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../../core/services/loading.service";
import {Router} from "@angular/router";

@Component({
   selector: 'pnip-tr-primeiro-acesso',
   template: '',
   styleUrls: []
})
export class PrimeiroAcessoComponent implements OnInit {

   constructor(private loadingService: LoadingService, private router: Router) {}

   ngOnInit() {
      // TODO: se houver solicitação, redirecionar para 'minhas-solicitacoes'
      this.router.navigate(['/portal-tr/primeiro-acesso/solicitar']);
   }

}
