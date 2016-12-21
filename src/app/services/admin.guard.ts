import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private _login: LoginService) { }

    canActivate() {
        if (this._login.isLoggedIn() && this._login.getRole() === "admin") {
            return true;
        }
    }
}