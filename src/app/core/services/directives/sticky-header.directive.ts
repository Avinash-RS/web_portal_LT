import { Directive, OnInit, ElementRef, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: '[stickyHeaderDirective]'
})
export class StickyHeaderDirective implements OnInit {

    // tslint:disable-next-line:no-output-on-prefix
    @Output() scrollValues = new EventEmitter<any>();

    ngOnInit() {
    }

    constructor() {}

    @HostListener('scroll', ['$event']) private onScroll($event: Event): void {
        // console.log($event.srcElement.scrollLeft, $event.srcElement.scrollTop);
        this.scrollValues.emit($event.srcElement);
    }
}
