import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './inherit.html'
})

export class InheritanceComponent {

    cities: SelectItem[];
    selectedCity: string;

    constructor() {
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY');
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM');
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN');
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST');
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS');
    }

}