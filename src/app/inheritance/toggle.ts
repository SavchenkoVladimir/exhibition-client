import { Component, NgModule, forwardRef } from '@angular/core';
import { ToggleButtonModule, ToggleButton } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

var TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function() { return Button; }),
    multi: true
};

@Component({
    selector: 'p-toggleButton2',
    template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), 'ui-button-text-icon-left': (onIcon&&offIcon),\n                'ui-state-active': checked, 'ui-state-hover': hover&&!disabled, 'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\" (mouseover)=\"mouseEnter($event)\" (mouseleave)=\"mouseLeaved($event)\">\n            <span *ngIf=\"onIcon||offIcon\" [class]=\"getIconClass()\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? onLabel : offLabel}}</span>\n        </div>\n  <br /> {{entered}}   ",
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
})
class Button extends ToggleButton {
    public entered: string;

    mouseEnter(event) {
        this.entered = "Mouse entered";        
    }

    mouseLeaved(event) {
        this.entered = "Mouse leaved";
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Button],
    declarations: [Button]
})
export class ButtonModule extends ToggleButtonModule {

}