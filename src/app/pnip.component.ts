import {Component} from '@angular/core';
import {LoadingService} from "./core/services/loading.service";
import {EnvService} from "./core/services/env/env.service";

@Component({
   selector: 'pnip-root',
   templateUrl: './pnip.component.html',
   styleUrls: []
})
export class PnipComponent {

   constructor(protected loadingService: LoadingService) {}

}
