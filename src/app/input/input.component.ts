import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './input.html'
})
export class InputComponent {
    checked: boolean;
}