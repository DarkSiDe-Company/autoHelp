import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
    selector: '[formControlName][phoneMask]'
})
export class PhoneMaskDirective implements OnInit, OnDestroy {

    private _preValue: string = '';

    componentDestroyed$ = new Subject<void>();

    @Input()
    set preValue(value: string) {
        this._preValue = value;
    }

    constructor(private el: ElementRef,
        private _phoneControl: NgControl,
        private renderer: Renderer2) { }

    ngOnInit() {
        this.phoneValidate();
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    phoneValidate() {
        const control = this._phoneControl.control;
        if (!control) {
            return;
        }
        control.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

            let preInputValue: string = this._preValue;
            const lastChar: string = preInputValue.substr(preInputValue.length - 1);
            let newVal = data.replace(/\D/g, '');

            let start = this.el.nativeElement.selectionStart;
            let end = this.el.nativeElement.selectionEnd;

            if (data.length < preInputValue.length) {
                if (preInputValue.length < start) {
                    if (lastChar === ')') {
                        newVal = newVal.substr(0, newVal.length - 1);
                    }
                }
                //if no number then flush
                if (newVal.length === 0) {
                    newVal = '';
                }
                else if (newVal.length <= 3) {
                    newVal = newVal.replace(/^(\d{0,3})/, '($1');
                } else if (newVal.length <= 6) {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
                } else {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
                }

                console.log(start)

                control.setValue(newVal, { emitEvent: false });
                //keep cursor the normal position after setting the input above.
                this.renderer.selectRootElement(this.el).nativeElement.setSelectionRange(start, end);
                //when typed value in input
            } else {
                // this.message = 'Typing...'; //Just console
                const removedD = data.charAt(start);
                // don't show braces for empty value
                if (newVal.length === 0) {
                    newVal = '';
                }
                // don't show braces for empty groups at the end
                else if (newVal.length <= 3) {
                    newVal = newVal.replace(/^(\d{0,3})/, '($1)');
                } else if (newVal.length <= 6) {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
                } else {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
                }

                if (preInputValue.length >= start) {
                    switch (removedD) {
                        case '(':
                        case '-':
                        case ' ':
                            start = start + 1;
                            end = end + 1;
                            break;
                        case ')':
                            start = start + 2;
                            end = end + 2;
                            break;
                        default:
                            break;
                    }
                    control.setValue(newVal, { emitEvent: false });
                    this.renderer.selectRootElement(this.el).nativeElement.setSelectionRange(start, end);
                } else {
                    control.setValue(newVal, { emitEvent: false });
                    this.renderer.selectRootElement(this.el).nativeElement.setSelectionRange(start + 2, end + 2); // +2 because of wanting standard typing
                }
            }
        });
    }
}