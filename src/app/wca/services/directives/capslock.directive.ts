import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapslock]'
})
export class CapslockDirective {

  constructor() {
 }

  // tslint:disable-next-line:no-output-rename
  @Output('capsLock') capsLock = new EventEmitter<any>();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.capsLock.emit(event.getModifierState && event.getModifierState('CapsLock'));
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.capsLock.emit(event.getModifierState && event.getModifierState('CapsLock'));
  }
}

