import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {HabilitarTRDTO} from "../../../../core/dtos/habilitar-tr.dto";
import {EmbarcacoesComponent} from "./embarcacoes/embarcacoes.component";
import {DadosProfissionaisComponent} from "./dados-profissionais/dados-profissionais.component";
import {DadosPessoaisComponent} from "./dados-pessoais/dados-pessoais.component";

@Component({
   selector: 'pnip-tr-form-solicitar-acesso',
   templateUrl: './form-solicitar-acesso.component.html',
   styleUrls: ['./form-solicitar-acesso.component.css'],
})
export class FormSolicitarAcessoComponent {

   @ViewChild('dadosPessoais') dadosPessoaisComponent!: DadosPessoaisComponent;
   @ViewChild('dadosProfissionais') dadosProfissionaisComponent!: DadosProfissionaisComponent;
   @ViewChild('embarcacoes') embarcacoesComponent!: EmbarcacoesComponent;

   public dto: HabilitarTRDTO;

   public steps = [
      {id: 'dados-pessoais',      title: 'Dados Pessoais',      enabled: true,  done: false},
      {id: 'dados-profissionais', title: 'Dados profissionais', enabled: false, done: false},
      {id: 'embarcacoes',         title: 'Embarcações',         enabled: false, done: false},
      {id: 'revisar-solicitacao', title: 'Revisar solicitação', enabled: false, done: false},
   ];

   public active;

   @Output() onSaveEvent = new EventEmitter<HabilitarTRDTO>();

   constructor() {
      this.dto = new HabilitarTRDTO();
      this.active = 'dados-pessoais';
   }

   goToStep(step: string) {
      if (step === this.active) return;
      // antes de ir para atapa, verificamos se o formulario esta preenchido corretamente
      const formValid = (() => {
         switch (this.active) {
            case 'dados-pessoais':      return this.dadosPessoaisComponent.submit(true);
            case 'dados-profissionais': return this.dadosProfissionaisComponent.submit(true);
            case 'embarcacoes':         return this.embarcacoesComponent.submit(true);
            default: return true;
         }
      })();
      if (formValid) this.active = step;
   }

   backToStep() {
      let currentIndex = this.steps.findIndex(step => step.id === this.active);
      if (currentIndex) {
         this.active = this.steps[currentIndex - 1].id;
      }
   }

   nextStep() {
      let currentIndex = this.steps.findIndex(step => step.id === this.active);
      if (currentIndex !== this.steps.length - 1) {
         this.steps[currentIndex + 1].enabled = true;
         this.active = this.steps[currentIndex + 1].id;
      }
   }

   onSaveStep() {
      let step = this.steps.find(step => step.id === this.active);
      if (step) step.done = true;
      this.nextStep();
   }

   onSaveAll() {
      this.dto.cpf = this.dto.cpf.toString();
      this.dto.telefone = this.dto.telefone? this.dto.telefone.toString(): this.dto.telefone;
      this.onSaveEvent.emit(this.dto);
   }

}
