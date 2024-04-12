import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-control-messages',
  template: `
    <div *ngIf="errorMessage !== null" class="help-block has-error">{{ errorMessage }}</div>
  `,
  standalone: true,
  imports: [CommonModule] ,// Thêm CommonModule vào @Component.imports
  styles: ['.help-block.has-error { color: red; }']
})
export class ControlMessagesComponent {
  @Input() control: AbstractControl;
  @Input() label: string;

  get errorMessage(): string | null {
    if (this.control && this.control.invalid && this.control.touched) {
      const errors = this.control.errors;
      if (errors && errors['required']) {
        return `${this.label} là bắt buộc`;
      }
      // Add more error messages here for different validators if needed
    }
    return null;
  }
}
