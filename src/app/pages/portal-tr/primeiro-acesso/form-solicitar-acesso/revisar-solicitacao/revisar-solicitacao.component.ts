import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HabilitarTRDTO} from "../../../../../core/dtos/habilitar-tr.dto";
import {PdfUtils} from "../../../../../utils/components/pdf.utils";

@Component({
   selector: 'pnip-tr-form-revisar-solicitacao',
   templateUrl: './revisar-solicitacao.component.html',
   styleUrls: ['../form-solicitar-acesso.component.css'],
})
export class RevisarSolicitacaoComponent {

   @Input() dto!: HabilitarTRDTO;

   @Output() onSaveEvent = new EventEmitter<void>();
   @Output() onBackToStepEvent = new EventEmitter<void>();

   constructor() {}

   verPdf(base64: string) {
      PdfUtils.openViewer(base64)
   }

   submit() {
      this.onSaveEvent.emit();
   }

}
