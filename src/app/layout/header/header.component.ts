
//@ts-ignore
import Dropdown from "src/assets/js/dropdown/dropdown.js";

import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

import {AuthService} from "../../core/services/auth/auth.service";

@Component({
   selector: 'pnip-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
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

   constructor(protected auth: AuthService, private router: Router) {}

   ngOnInit() {
      this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
            this.portal = null;
            const url = event.url;
            if (!url) {
               return;
            } else if (url.includes('/portal-admin')) this.portal = [{name: 'Portal ADMIN', href: url}];
            else if (url.includes('/portal-mpa')) this.portal = [{name: 'Portal MPA', href: url}];
            else if (url.includes('/portal-tr')) this.portal = [{name: 'Portal TR', href: url}];
         }
      });
   }

   openDrop() {
      document.querySelectorAll('[data-toggle="dropdown"]').forEach((trigger) => {
         console.log(trigger)
         const config = {
            iconToHide: 'fa-chevron-up',
            iconToShow: 'fa-chevron-down',
            trigger,
            useIcons: true,
         }
         const dropdown = new Dropdown(config);
            dropdown.setBehavior();
      });
   }

   login() {
      this.auth.login();
   }

}
