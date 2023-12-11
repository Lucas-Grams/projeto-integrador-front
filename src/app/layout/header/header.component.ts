import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {LoginService} from "../../core/services/login.service";

@Component({
   selector: 'pnip-header',
   templateUrl: './header.component.html',
   styleUrls: []
})
export class HeaderComponent implements OnInit {

   public signature = 'Ministério da Pesca e Aquicultura';
   public title = 'Plataforma Nacional da Indústria do Pescado';
   public logo = 'assets/images/govbr-logo.png';

   public hasLogin = true;

   public portal: {name: string, href: string}[] | null = null;

   public actions = [
      {
         icon: 'headset',
         name: 'Suporte',
         title: 'Suporte',
         url: '#',
         clickEventName: 'suporte'
      },
      {
         icon: 'comment',
         name: 'Comentários',
         title: 'Comentários',
         url: '#',
         clickEventName: 'comentarios'
      }
   ];

   constructor(protected loginService: LoginService, private router: Router) {}

   ngOnInit() {
      this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
            this.portal = null;
            const url = event.url;
            if (!url) {
               return;
            }
            else if (url.includes('/portal-admin')) this.portal = [{name: 'Portal ADMIN', href: url}];
            else if (url.includes('/portal-mpa'))   this.portal = [{name: 'Portal MPA', href: url}];
            else if (url.includes('/portal-tr'))    this.portal = [{name: 'Portal TR', href: url}];
         }
      });
   }

   login() {
      this.loginService.login();
   }

}
