import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {CepService} from "../../../../../core/services/cep.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {cpfValidator} from "../../../../../utils/validators/cpf.validator";
import {cepValidator} from "../../../../../utils/validators/cep.validator";
import { Usuario} from "../../../../../core/models/usuario.model";
import {UsuarioService} from "../../../../../core/services/usuario.service";
import {BrSelectComponent} from "../../../../../shared/br-select/br-select.component";
import Swal from "sweetalert2";
import {Unidade} from "../../../../../core/models/unidade.model";
import {UnidadeService} from "../../../../../core/services/unidade.service";

@Component({
   selector: 'pnip-admin-form-select-unidade',
   templateUrl: './form-select-unidade.component.html',
   styleUrls: []
})
export class FormSelectUnidadeComponent implements OnInit {

   unidades: Unidade[] = [];
   newUnidade:Unidade = new Unidade();
   @Output() unidadeEmitter: EventEmitter<Unidade> = new EventEmitter<Unidade>();
   @ViewChild('unidadeSelect', {static: false}) unidadeSelect!: BrSelectComponent;
   unis: any = [];
   constructor(private unidadeService: UnidadeService) {}

   ngOnInit() {
      this.unidadeService.findAll().subscribe((data) => {
         this.unidades = data;
         this.unidades.forEach((unidade) => {
            this.unis.push({label: unidade.nome, value: unidade.id})
         });
      });
   }

   selecionaUnidade(id: number) {
      this.newUnidade = new Unidade();
      this.unidades.forEach((unidade) => {
         if (unidade.id == this.unidadeSelect.getOptionSelected()) {
            this.newUnidade = Object.assign(unidade);
         }
      })
   }

   emitirUnidade() {
      if (this.newUnidade != null && this.newUnidade != undefined) {
         this.unidadeEmitter.emit(this.newUnidade);
      }
   }
}
