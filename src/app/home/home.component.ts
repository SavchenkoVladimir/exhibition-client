import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, CanActivate } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './home.html'
})

export class HomeComponent {
    
    constructor(private _login: LoginService, private _router: Router) { }
    
    logOut(event){
        event.preventDefault();
        this._login.logout();
        this._router.navigate(['login']);
    }
}