import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HabilitarTRDTO} from "../../../../../core/dtos/habilitar-tr.dto";
import {BrSelectComponent} from "../../../../../shared/br-select/br-select.component";
import {DataFormsService} from "../../../../../core/services/data-forms.service";

@Component({
   selector: 'pnip-tr-form-dados-profissionais',
   templateUrl: './dados-profissionais.component.html',
   styleUrls: ['../form-solicitar-acesso.component.css'],
})
export class DadosProfissionaisComponent implements OnInit {

   public formGroup!: FormGroup;
   public ufs: any = [];

   @ViewChild('copiaHabilitacaoInput', {static: false}) copiaHabilitacaoInput!: ElementRef;
   @ViewChild('diplomaCertificadoInput', {static: false}) diplomaCertificadoInput!: ElementRef;

   @ViewChild('conselhoClasseSelect', {static: false}) conselhoClasseSelect!: BrSelectComponent;
   @ViewChild('ufConselhoSelect', {static: false}) ufConselhoSelect!: BrSelectComponent;

   @Input() dto!: HabilitarTRDTO;

   @Output() onSaveStep = new EventEmitter<void>();
   @Output() onBackToStepEvent = new EventEmitter<void>();

   constructor(private fb: FormBuilder, private dataFormsService: DataFormsService, private renderer: Renderer2) {
      this.dataFormsService.getJson('uf').subscribe(ufs => this.ufs = ufs);
   }

   ngOnInit() {
      this.formGroup = this.fb.group({
         formacao: [this.dto.formacao, Validators.required],
         numHabilitacao: [this.dto.numHabilitacao],
         conselhoClasse: [null],
         ufConselho: [null],
         copiaHabilitacao: [this.dto.copiaHabilitacao, Validators.required],
         diplomaCertificacao: [this.dto.diplomaCertificacao, Validators.required],
      });
   }

   setConselho() {
      this.formGroup.get('ufConselho')?.setValue(null);
      if (this.conselhoClasseSelect && this.conselhoClasseSelect.getOptionSelected().length) {
         this.formGroup.get('conselhoClasse')?.setValue(this.conselhoClasseSelect.getOptionSelected());
      }
   }

   submit(goToStep = false) {
      if (this.conselhoClasseSelect && this.conselhoClasseSelect.getOptionSelected().length) {
          this.formGroup.get('conselhoClasse')?.setValue(this.conselhoClasseSelect.getOptionSelected());
      }
      if (this.ufConselhoSelect && this.ufConselhoSelect.getOptionSelected().length) {
          this.formGroup.get('ufConselho')?.setValue(this.ufConselhoSelect.getOptionSelected());
      }
      if (this.formGroup.valid) {
         const form: HabilitarTRDTO = <HabilitarTRDTO>{...this.formGroup.value};
         for (let attr in form) {
            // @ts-ignore
            this.dto[attr] = form[attr];
         }
         if (!goToStep) this.onSaveStep.emit();
         return true;
      } else {
         this.formGroup.markAllAsTouched();
      }
      return false;
   }

   openInputUpload(attr: string) {
      // @ts-ignore
      this.renderer.selectRootElement(this[attr].nativeElement).click();
   }

   onUploadSelected(event: any, attr: string) {
      let selectedFile = event.target.files[0];
      if (selectedFile) {
         this.formGroup.get(attr)?.setValue(selectedFile.name);
         const fileReader = new FileReader();
         fileReader.readAsDataURL(selectedFile);
         fileReader.onload = () => {
            const base64 = fileReader.result as string;
            // @ts-ignore
            this.dto[attr + 'Base64'] = base64;
         };
      }
   }

}
