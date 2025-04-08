import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[TrimWhitespaces]'
})
export class TrimWhitespacesDirective {
  private readonly element: ElementRef<HTMLInputElement> = inject(ElementRef);

  @HostListener('blur')
  onBlur() {
    const value = this.element.nativeElement.value;
    const valueTrim = value.trim();
    if (value !== valueTrim) {
      this.element.nativeElement.value = valueTrim;
    }
  }
}
