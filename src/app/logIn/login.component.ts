import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'my-app',
    templateUrl: './loginForm.html',
    providers: [LoginService],
})

export class LoginComponent {

    constructor(protected _loginService: LoginService, protected _router: Router,
        protected alertService: AlertService
    ) { }

    user = {
        name: '',
        password: '',
        rememberPassword: false
    };

    onSubmit() {
        let body = this.user;
     
        this._loginService.login(body)
            .then(
            data => {
                this._router.navigate(['home']);
            },
            err => { this.alertService.setDangerAlert(`Server error. Please, try later.`);  }
            );
    }
}

