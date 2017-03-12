import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Questionnaire } from '../questionnaire/Questionnaire';

@Injectable()
export class HttpService {

    constructor(private _http: Http) { }


    //TODO: implement more reasonable error handling
    insertQuestionnaireResults(body): Promise<Questionnaire> {
        let headers = this.getHeaders();

        return this._http.post('http://localhost:3000/app/questionnaire', body, { headers: headers })
            .toPromise()
            .then(data => data)
            .catch(err => err);
    }

    updateQuestionnaireResults(body): Promise<Questionnaire> {
        let headers = this.getHeaders();

        return this._http.put(`http://localhost:3000/app/questionnaire/${body._id}`, body, { headers: headers })
            .toPromise()
            .then(this.extractData)
            .catch(err => err);
    }

    getQuestionnaireResults(body): Observable<Questionnaire[]> {
        let headers = this.getHeaders();

        return this._http.get(`http://localhost:3000/app/questionnaire/?${body}`, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    sendImage(body): Promise<any> {
        let headers = new Headers();
        let token = localStorage.getItem('auth_token');
        headers.append('x-access-token', token);

        return this._http.post('http://localhost:3000/app/placeImage', body, { headers: headers })
            .toPromise()
            .then(this.extractData)
            .catch(err => err);
    }

    getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let token = localStorage.getItem('auth_token');
        headers.append('x-access-token', token);

        return headers;
    }

    protected extractData(data: Response) {
        return JSON.parse(data['_body']);
    }

    //TODO: implement more reasonable error handling
    protected handleError(error: Response | any) {
        return Observable.throw(`The server is not available.`);
    }
}
