import {Directive, HostBinding, HostListener, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[cdkDetailRow]'
})
export class CdkDetailRowDirective {
  private row: any;
  private tRef: TemplateRef<any>;
  private opened: boolean = false;

  @Input()
  set cdkDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
    }
  }

  @Input('cdkDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this.tRef) {
      this.tRef = value;
    }
  }

  @Input('cdkDetailRowExpanded')
  set isExpanded(cdkDetailRowExpanded: boolean) {
    if (cdkDetailRowExpanded) {
      this.render();
    } else {
      this.vcRef.clear();
    }
    // this.toggle();
  }

  constructor(public vcRef: ViewContainerRef) { }

  private render(): void {
    this.vcRef.clear();
    if (this.tRef && this.row) {
      this.vcRef.createEmbeddedView(this.tRef, { $implicit: this.row });
    }
  }
}
