import {Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
   selector: 'pnip-tr-form-solicitar-acesso',
   templateUrl: './form-solicitar-acesso.component.html',
   styleUrls: ['./form-solicitar-acesso.component.css'],
})
export class FormSolicitarAcessoComponent {

   public formGroup: FormGroup;

   @ViewChild('copiaHabilitacaoInput', { static: false }) copiaHabilitacaoInput!: ElementRef;
   @ViewChild('diplomaCertificadoInput', { static: false }) diplomaCertificadoInput!: ElementRef;

   @Output() onSaveEvent = new EventEmitter<void>();

   constructor(private fb: FormBuilder, private renderer: Renderer2) {
      this.formGroup = this.fb.group({
         nome: ['Joedeson Jr', Validators.required],
         cpf: ['309.182.021-01', Validators.required],
         email: [null, Validators.required],
         telefone: [null, Validators.required],
         cep: [null, Validators.required],
         logradouro: [null, Validators.required],
         numero: [null, Validators.required],
         complemento: [null, Validators.required],
         municipio: [null, Validators.required],
         uf: [null, Validators.required],
         formacao: [null, Validators.required],
         numHabilitacao: [null, Validators.required],
         conselhoClasse: [null, Validators.required],
         ufConselho: [null, Validators.required],
         copiaHabilitacao: [null, Validators.required],
         diplomaCertificado: [null, Validators.required]
      });
   }

   submit() {
      this.onSaveEvent.emit({...this.formGroup.value});
   }

   openCopiaHabilitacaoUpload() {
      this.renderer.selectRootElement(this.copiaHabilitacaoInput.nativeElement).click();
   }

   openDiplomaCertificadoUpload() {
      this.renderer.selectRootElement(this.diplomaCertificadoInput.nativeElement).click();
   }

   onCopiaHabilitacaoSelected(event: any) {
      const selectedFile = event.target.files[0];
      console.log('Arquivo selecionado:', selectedFile);
   }

   onDiplomaCertificadoSelected(event: any) {
      const selectedFile = event.target.files[0];
      console.log('Arquivo selecionado:', selectedFile);
   }

}
