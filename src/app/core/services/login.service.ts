import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LoadingService} from "./loading.service";

@Injectable()
export class LoginService {

   private username: string | null = null;
   private role: string | null = null;
   private primeiroAcesso = false;

   constructor(private loadingService: LoadingService, private router: Router) {}

   public mockLogin() {
      this.loadingService.show = true;
      setTimeout(() => {
         this.username = 'Joedeson Jr';
         this.role = 'tr';
         this.primeiroAcesso = true;
         this.router.navigate([`/portal-${this.role}`]);
         setTimeout(() => this.loadingService.show = false, 200);
      }, 1000);
   }

   public getUsername() {
      return this.username;
   }

   public isPrimeiroAcesso() {
      return this.primeiroAcesso;
   }

}
