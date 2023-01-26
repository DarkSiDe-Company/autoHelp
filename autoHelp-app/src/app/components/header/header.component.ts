import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

const data = [['Как мы работаем', 'mainContent'], ['Услуги', 'services'], ['Контакты', 'contacts'],]

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    menuTitles = data;
    constructor(private scroller: ViewportScroller) { }

    scroll(target: string) {
        this.scroller.scrollToAnchor(target)     
    }
}
