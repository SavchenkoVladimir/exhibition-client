//TODO: At the moment the server does not encode user role in jwtHelper.
// So, the RBAC will be emplemented when the server will do it.
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
    protected loggedIn = false;
    protected jwtHelper: JwtHelper;
    protected role: String;

    constructor(protected _http: Http) {
        this.jwtHelper = new JwtHelper();
        const token = localStorage.getItem('auth_token');
        if (token) {
            const userInfo = this.jwtHelper.decodeToken(token);
            console.log(userInfo);
            this.role = userInfo["_doc"]["role"];
            this.loggedIn = true;
        }
    }

    login(body): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post('http://localhost:3000/authenticate', body, { headers })
            .toPromise()
            .then(this.handleResponse)
            .catch(err => err);
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

    handleResponse(data: Response) {
        const response = JSON.parse(data["_body"]);

        if (response.success === true) {
            localStorage.setItem('auth_token', response.token);
            const userInfo = this.jwtHelper.decodeToken(response.token);           
            this.role = userInfo["_doc"]["role"];
            this.loggedIn = true;
        }

        return response.message;
    }

}