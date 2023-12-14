import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {EmbarcacaoService} from "../../../../../core/services/embarcacao.service";
import {EmbarcacaoDTO} from "../../../../../core/dtos/embarcacao.dto";
import {ResponseDTO, ResponseStatus} from "../../../../../core/dtos/response.dto";
import {HabilitarTRDTO} from "../../../../../core/dtos/habilitar-tr.dto";

@Component({
   selector: 'pnip-tr-form-embarcacoes',
   templateUrl: './embarcacoes.component.html',
   styleUrls: ['../form-solicitar-acesso.component.css'],
   providers: [EmbarcacaoService]
})
export class EmbarcacoesComponent {

   public filtro: string = '';
   private filtroTimeout!: any;
   public embarcacoesFiltro: EmbarcacaoDTO[] | null = null;
   public embarcacaoSelecionada: EmbarcacaoDTO | null = null;
   private declaracaoProprietarioIndex!: number;
   public isSubmit = false;

   @ViewChild('declaracaoProprietarioInput') declaracaoProprietarioInput!: ElementRef;

   @Input() dto!: HabilitarTRDTO;

   @Output() onSaveStep = new EventEmitter<any>();
   @Output() onBackToStepEvent = new EventEmitter<void>();

   constructor(private embarcacaoService: EmbarcacaoService, private renderer: Renderer2) {}

   public buscarEmbarcacoes() {
      if (this.filtroTimeout) {
         clearTimeout(this.filtroTimeout);
      }
      this.embarcacoesFiltro = null;
      this.filtroTimeout = setTimeout(this.getEmbarcacoes.bind(this), 300);
   }

   private getEmbarcacoes() {
      if (this.filtro.toString().length < 3) return;
      this.embarcacaoService.findAllEmbarcacaoByRgpTieNome(this.filtro).subscribe((response: ResponseDTO<EmbarcacaoDTO[]>) => {
         if (response.status === ResponseStatus.SUCCESS) {
            this.embarcacoesFiltro = response.data;
         }
      });
   }

   public selecionarEmbarcacao(embarcacao: EmbarcacaoDTO) {
      this.embarcacaoSelecionada = embarcacao;
      this.embarcacoesFiltro = null;
      this.filtro = '';
   }

   public limparSelecionado() {
      this.embarcacaoSelecionada = null;
   }

   adicionarEmbarcacao() {
      if (this.embarcacaoSelecionada) {
         this.dto.embarcacoes.push(Object.assign({}, this.embarcacaoSelecionada));
         this.limparSelecionado();
      }
   }

   removerEmbarcacao(index: number) {
      this.dto.embarcacoes = this.dto.embarcacoes.filter((e, i) => i !== index);
   }

   openDeclaracaoProprietarioUpload(index: number) {
      this.declaracaoProprietarioIndex = index;
      this.renderer.selectRootElement(this.declaracaoProprietarioInput.nativeElement).click();
   }

   onDeclaracaoProprietarioSelected(event: any) {
      let selectedFile = event.target.files[0];
      if (selectedFile) {
         this.dto.embarcacoes[this.declaracaoProprietarioIndex].declaracaoProprietario = selectedFile.name;
         console.log(selectedFile, this.declaracaoProprietarioIndex);
      }
   }

   submit(goToStep = false) {
      this.isSubmit = true;
      const isValid = this.dto.embarcacoes.filter(e => !e.declaracaoProprietario).length === 0;
      if (isValid) {
         if (!goToStep) this.onSaveStep.emit();
      }
      return isValid;
   }

}
