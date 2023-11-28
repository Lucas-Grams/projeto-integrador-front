import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../core/services/login.service";
import {Router} from "@angular/router";

@Component({
   selector: 'pnip-tr-principal',
   templateUrl: './principal.component.html',
   styleUrls: []
})
export class PrincipalComponent implements OnInit {

   constructor(private loginService: LoginService, private router: Router) {}

   ngOnInit() {
      if (this.loginService.isPrimeiroAcesso()) {
         this.router.navigate(['/portal-tr/primeiro-acesso']);
      }
   }

}
