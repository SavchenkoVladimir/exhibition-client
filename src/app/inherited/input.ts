import { Component, NgModule, forwardRef, Injectable } from '@angular/core';
import { InputSwitchModule, InputSwitch } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { ElementRef } from '@angular/core';

var INPUTSWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function() { return Switch; }),
    multi: true
};

@Component({
    selector: 'p-inputSwitches',
    template: "\n        <div [ngClass]=\"{'ui-inputswitch ui-widget ui-widget-content ui-corner-all': true,\n            'ui-state-disabled': disabled,'ui-inputswitch-checked':checked}\" (click)=\"toggle($event, in)\"\n  (mouseover)=\"mouseEnter($event)\" (mouseleave)=\"mouseLeaved($event)\"   [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inputswitch-off\">\n                <span class=\"ui-inputswitch-offlabel\">{{offLabel}}</span>\n            </div>\n            <div class=\"ui-inputswitch-on\">\n                <span class=\"ui-inputswitch-onlabel\">{{onLabel}}</span>\n            </div>\n            <div [ngClass]=\"{'ui-inputswitch-handle ui-state-default':true, 'ui-state-focus':focused}\"></div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"checkbox\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" readonly=\"readonly\"/>\n            </div>\n        </div>\n  <br /> {{entered}}    ",
    providers: [INPUTSWITCH_VALUE_ACCESSOR, DomHandler]
})
class Switch extends InputSwitch {
    public entered: string;

    constructor(el: ElementRef, domHandler: DomHandler) {
        super(el, domHandler);
    }

    mouseEnter(event) {
        this.entered = "Mouse entered";
    }

    mouseLeaved(event) {
        this.entered = "Mouse leaved";
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Switch],
    declarations: [Switch]
})
export class SwitchModule extends InputSwitchModule {

}