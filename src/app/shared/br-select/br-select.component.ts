import {AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

//@ts-ignore
import BRSelect from "@govbr-ds/core/dist/components/select/select";

@Component({
   selector: 'br-select-pnip',
   templateUrl: './br-select.component.html',
   styleUrls: []
})
export class BrSelectComponent implements AfterViewInit, AfterViewChecked {

   @Input() id: string = '';
   @Input() label: string = '';
   @Input() placeholder: string = 'Selecione';
   @Input() multiple: boolean = false;
   @Input() disabled: boolean = false;
   @Input() options: {label: string, value: any}[] = [];
   @Input() optionSelected: any = null;

   @Output() onSelectedEvent: any = new EventEmitter<any>();

   instance: any;

   constructor(private brSelect: ElementRef) {}

   ngAfterViewInit() {
      this.instance = new BRSelect(".br-select", this.brSelect.nativeElement.querySelector(".br-select"));
   }

   setSelected() {
      setTimeout(() => this.onSelectedEvent.emit(this.instance.selectedValue), 10);
   }

   getOptionSelected() {
      return this.instance.selectedValue;
   }

   ngAfterViewChecked() {
      if (this.instance) {
         this.instance.resetOptionsList();
      }
   }

}
