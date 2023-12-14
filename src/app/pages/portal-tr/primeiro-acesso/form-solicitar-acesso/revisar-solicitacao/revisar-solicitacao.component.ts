import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HabilitarTRDTO} from "../../../../../core/dtos/habilitar-tr.dto";

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

   removerEmbarcacao(index: number) {
      this.dto.embarcacoes = this.dto.embarcacoes.filter((e, i) => i !== index);
   }

   submit() {
      this.onSaveEvent.emit();
   }

}
