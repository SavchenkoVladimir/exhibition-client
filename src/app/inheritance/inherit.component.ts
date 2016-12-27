import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './inherit.html'
})

export class InheritanceComponent {
    checked: boolean;
}