import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class LoginService {
    private loggedIn = false;
    private jwtHelper: JwtHelper;
    private role: String;

    constructor(private _http: Http) {
        this.jwtHelper = new JwtHelper();
        let token = localStorage.getItem('auth_token');
        if (token) {
            let userInfo = this.jwtHelper.decodeToken(token);
            this.role = userInfo["_doc"]["role"];
            this.loggedIn = true;
        }
    }

    login(body) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post('http://localhost:3000/authenticate', body, { headers })
            .map((data) => {
                let response = JSON.parse(data["_body"]);

                if (response.success === true) {
                    localStorage.setItem('auth_token', response.token);
                    let userInfo = this.jwtHelper.decodeToken(response.token);
                    this.role = userInfo["_doc"]["role"];
                    this.loggedIn = true;
                }
                return response.message;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getRole() {
        return this.role;
    }
}