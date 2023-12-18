import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../core/services/login.service";
import {Router} from "@angular/router";

@Component({
   selector: 'pnip-tr-principal',
   template: '',
   styleUrls: []
})
export class PrincipalComponent implements OnInit {

   constructor(private loginService: LoginService, private router: Router) {}

   ngOnInit() {
      // TODO
      this.router.navigate(['/portal-tr/primeiro-acesso']);
   }

}
