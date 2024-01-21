import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {EmbarcacaoDTO} from "../../../../core/dtos/embarcacao.dto";
import {EmbarcacaoService} from "../../../../core/services/embarcacao.service";
import {ResponseDTO, ResponseStatus} from "../../../../core/dtos/response.dto";
import {EmbarcacaoTRFormDTO} from "../../../../core/dtos/embarcacao-tr-form.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {cpfValidator} from "../../../../utils/validators/cpf.validator";
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";

@Component({
   selector: 'pnip-tr-cadastrar-embarcacao',
   templateUrl: './cadastrar-embarcacao.component.html',
   styleUrls: ['./cadastrar-embarcacao.component.css'],
})
export class CadastrarEmbarcacaoComponent {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Embarcações',
         url: '/portal-tr/embarcacoes'
      },
      {
         label: 'Cadastrar embarcação',
         active: true
      }
   ];

   public forms: FormGroup[] = [];

   public dtos: EmbarcacaoTRFormDTO[] = [];

   public filtro: string = '';
   public embarcacoesFiltro: EmbarcacaoDTO[] | null = null;
   public embarcacaoSelecionada: EmbarcacaoDTO | null = null;

   private filtroTimeout!: any;
   private declaracaoProprietarioIndex!: number;

   @ViewChild('declaracaoProprietarioInput') declaracaoProprietarioInput!: ElementRef;

   constructor(private embarcacaoService: EmbarcacaoService, private formBuilder: FormBuilder,
               private loadingService: LoadingService, private router: Router, private renderer: Renderer2) {}

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
         let dto: EmbarcacaoTRFormDTO = new EmbarcacaoTRFormDTO();
             dto.idEmbarcacao = this.embarcacaoSelecionada.id;
             dto.embarcacaoDTO = Object.assign({}, this.embarcacaoSelecionada);
         this.dtos.push(dto);

         this.forms.push(this.formBuilder.group({
            nomeProprietario: ['', [Validators.required, Validators.maxLength(255)]],
            cpfProprietario: ['', [Validators.required, cpfValidator()]],
            emailProprietario: ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
            mercadoAtuacao: ['', [Validators.required]],
            tempoMedioPesca: [null, [Validators.required]],
            tipoConservacao: ['', [Validators.required]],
            capacidadeTotal: [null, [Validators.required]],
            capacidadePescado: [null, [Validators.required]],
            declaracaoProprietario: ['', [Validators.required]]
         }));

         this.limparSelecionado();
      }
   }

   removerEmbarcacao(index: number) {
      this.dtos = this.dtos.filter((e, i) => i !== index);
      this.forms = this.forms.filter((e, i) => i !== index);
   }

   onMercadoAtuacaoSelected(value: string, index: number) {
      this.forms[index].get('mercadoAtuacao')?.setValue(value);
   }

   onTipoConservacaoSelected(value: any, index: number) {
      this.forms[index].get('tipoConservacao')?.setValue((value.length ? value.toString() : ''));
   }

   openDeclaracaoProprietarioUpload(index: number) {
      this.declaracaoProprietarioIndex = index;
      this.renderer.selectRootElement(this.declaracaoProprietarioInput.nativeElement).click();
   }

   onDeclaracaoProprietarioSelected(event: any) {
      let selectedFile = event.target.files[0];
      if (selectedFile) {
         const fileReader = new FileReader();
         fileReader.readAsDataURL(selectedFile);
         fileReader.onload = () => {
            const base64 = fileReader.result as string;
            this.forms[this.declaracaoProprietarioIndex].get('declaracaoProprietario')?.setValue(selectedFile.name);
            this.dtos[this.declaracaoProprietarioIndex].declaracaoProprietarioBase64 = base64;
            this.declaracaoProprietarioInput.nativeElement.value = null;
         };
      }
   }

   submit() {
      const isValid = this.forms.filter(f => f.invalid).length === 0;
      if (isValid) {
         this.forms.forEach((form, i) => {
            let dto: EmbarcacaoTRFormDTO = <EmbarcacaoTRFormDTO>{...form.value};
                dto.cpfProprietario = dto.cpfProprietario.toString();
                dto.tempoMedioPesca = Number.parseInt(dto.tempoMedioPesca.toString());
                dto.capacidadeTotal = Number.parseInt(dto.capacidadeTotal.toString());
                dto.capacidadePescado = Number.parseInt(dto.capacidadePescado.toString());
            for (let attr in dto) {
               // @ts-ignore
               this.dtos[i][attr] = dto[attr];
            }
         });
         this.salvar();
      } else {
         this.forms.forEach(f => {
            if (f.invalid) f.markAllAsTouched()
         });
      }
   }

   private salvar() {
      this.loadingService.show = true;
      this.embarcacaoService.cadastrarEmbarcacaoTR(this.dtos).subscribe((response) => {
         this.loadingService.show = false;
         if (response && response.status === ResponseStatus.SUCCESS) {
            this.minhasEmbarcacoes();
         } else {
            console.error(response.msg);
         }
      }, (error) => {
         console.error(error);
         this.loadingService.show = false;
      });
   }

   minhasEmbarcacoes() {
      this.router.navigate(['/portal-tr/embarcacoes']);
   }

}
