/* It is an example how to override/extend third party libraries. */
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './input.html'
})
export class InputComponent {
    checked: boolean;
}