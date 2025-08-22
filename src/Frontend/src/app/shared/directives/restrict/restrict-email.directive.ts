import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[RestrictEmail]'
})
export class RestrictEmailDirective {
  readonly allowedRegex = /^[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~.@]+$/;

  constructor() {
    inject(ElementRef<HTMLInputElement>);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isControlKey(event)) {
      return;
    }

    const key = event.key;
    if (!this.allowedRegex.test(key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') ?? '';
    for (const char of pastedText) {
      if (!this.allowedRegex.test(char)) {
        event.preventDefault();
        return;
      }
    }
  }


  private isControlKey(event: KeyboardEvent): boolean {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return true;
    }
    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'Escape', 'Delete',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];
    return allowedKeys.includes(event.key);
  }
}
