import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
   selector: 'pnip-header',
   templateUrl: './header.component.html',
   styleUrls: []
})
export class HeaderComponent implements OnInit {

   portal: any = null;

   constructor(private router: Router) {}

   ngOnInit() {
      this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
            const url = event.url;
            if (!url) {
               this.portal = null;
               return;
            }
            else if (url.includes('/portal-admin')) this.portal = [{name: 'Portal ADMIN', href: url}];
            else if (url.includes('/portal-mpa'))   this.portal = [{name: 'Portal MPA', href: url}];
            else if (url.includes('/portal-tr'))    this.portal = [{name: 'Portal TR', href: url}];
         }
      });
   }

}
