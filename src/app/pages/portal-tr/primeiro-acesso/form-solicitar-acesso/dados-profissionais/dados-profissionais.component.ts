import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HabilitarTRDTO} from "../../../../../core/dtos/habilitar-tr.dto";

@Component({
   selector: 'pnip-tr-form-dados-profissionais',
   templateUrl: './dados-profissionais.component.html',
   styleUrls: ['../form-solicitar-acesso.component.css'],
})
export class DadosProfissionaisComponent implements OnInit {

   public formGroup!: FormGroup;

   @ViewChild('copiaHabilitacaoInput', {static: false}) copiaHabilitacaoInput!: ElementRef;
   @ViewChild('diplomaCertificadoInput', {static: false}) diplomaCertificadoInput!: ElementRef;

   @Input() dto!: HabilitarTRDTO;

   @Output() onSaveStep = new EventEmitter<void>();
   @Output() onBackToStepEvent = new EventEmitter<void>();

   constructor(private fb: FormBuilder, private renderer: Renderer2) {}

   ngOnInit() {
      this.formGroup = this.fb.group({
         formacao: [this.dto.formacao, Validators.required],
         numHabilitacao: [this.dto.numHabilitacao],
         conselhoClasse: [this.dto.conselhoClasse],
         ufConselho: [this.dto.ufConselho],
         copiaHabilitacao: [this.dto.copiaHabilitacao, Validators.required],
         diplomaCertificacao: [this.dto.diplomaCertificacao, Validators.required],
      });
   }

   submit(goToStep = false) {
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
         console.log(selectedFile);
      }
   }

}
