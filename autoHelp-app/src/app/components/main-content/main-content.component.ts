import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.less']
})
export class MainContentComponent {
    constructor(private scroller: ViewportScroller) { }

    scroll() {
        this.scroller.scrollToAnchor('contacts')
    }
}
