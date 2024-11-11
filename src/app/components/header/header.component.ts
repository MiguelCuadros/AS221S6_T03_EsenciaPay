import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isForm: boolean = false;
  @Input() newValueForm!: boolean
  @Output() isFormVisible = new EventEmitter<boolean>();


  toggleForm(){
    this.isForm = this.newValueForm;
    this.isForm = !this.isForm;
    this.isFormVisible.emit(this.isForm)
  }

}
