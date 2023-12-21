import {Component, Input} from "@angular/core";

@Component({
   selector: 'pnip-status-solicitacao-utils',
   template: `
      <ng-container *ngIf="status">
         <div [ngClass]="getColor()" class="text-center pt-1 pb-1 pl-2 pr-2" [style.border-radius]="'4px'">
            <div class="text-secondary-01">{{getLabel()}}</div>
         </div>
      </ng-container>
   `,
})
export class StatusSolicitacaoUtils {

   @Input() status!: string;

   constructor() {}

   protected getLabel() {
      return this.status.replaceAll('_', ' ');
   }

   protected getColor() {
      switch (this.status) {
         case 'EM_ANALISE': return 'bg-secondary-06';
         case 'DEFERIDA':   return 'bg-success';
         case 'INDEFERIDA': return 'bg-danger';
         default:           return 'bg-secondary-06';
      }
   }

}
