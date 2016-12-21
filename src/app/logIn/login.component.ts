import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'my-app',
    templateUrl: './loginForm.html',
    providers: [LoginService],
})

export class LoginComponent {

    constructor(private _loginService: LoginService, private _router: Router) { }

    user = {
        name: '',
        password: '',
        rememberPassword: false
    };

    onSubmit() {
        let body = this.user;
        this._loginService.login(body)
            .subscribe(
                data => {this._router.navigate(['/home']);
            },
            err => { console.log(JSON.stringify(err)) }
            );
    }
}

