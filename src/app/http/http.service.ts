import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

    // TODO: implement proper Promises and Observables
    constructor(private _http: Http) { }

    insertQuizResults(body) {
        let headers = this.getHeaders();

        return this._http.post('http://localhost:3000/app/quizResults', body, { headers: headers })
            .map(data => data);
    }

    updateQuizResults(body) {
        let headers = this.getHeaders();

        return this._http.put(`http://localhost:3000/app/quizResults/${body._id}`, body, { headers: headers })
            .map(data => data);
    }

    getQuizResults(body) {
        let headers = this.getHeaders();

        return this._http.get(`http://localhost:3000/app/quizResults/?${body}`, { headers: headers })
            .map(data => data);
    }

    public sendImage(body) {
        let headers = new Headers();
        let token = localStorage.getItem('auth_token');
        headers.append('x-access-token', token);

        return this._http.post('http://localhost:3000/app/placeImage', body, { headers: headers })
            .map(data => data);
    }

    getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let token = localStorage.getItem('auth_token');
        headers.append('x-access-token', token);

        return headers;
    }

}
