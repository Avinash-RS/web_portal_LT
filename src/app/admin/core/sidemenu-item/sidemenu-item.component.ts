import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lxp-sidemenu-item',
    templateUrl: './sidemenu-item.component.html',
    styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit {

    @Input() menu;
    @Input() iconOnly: boolean;
    @Input() secondaryMenu = false;

    constructor() { }

    ngOnInit() {
    }

    // openlink(url: string) {
    //     window.open(url, '_blank');
    // }
    chechForChildMenu() {
        return (this.menu && this.menu.sub) ? true : false;
    }

}
