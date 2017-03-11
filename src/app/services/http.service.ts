import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { QuizResult } from '../dashboard/QuizResult';

@Injectable()
export class HttpService {

    constructor(private _http: Http) { }


    //TODO: implement more reasonable error handling
    insertQuizResults(body): Promise<QuizResult[]> {
        let headers = this.getHeaders();

        return this._http.post('http://localhost:3000/app/quizResults', body, { headers: headers })
            .toPromise()
            .then(data => data)
            .catch(err => err);
    }

    updateQuizResults(body): Promise<QuizResult> {
        let headers = this.getHeaders();

        return this._http.put(`http://localhost:3000/app/quizResults/${body._id}`, body, { headers: headers })
            .toPromise()
            .then(this.extractData)
            .catch(err => err);
    }

    getQuizResults(body): Observable<QuizResult[]> {
        let headers = this.getHeaders();

        return this._http.get(`http://localhost:3000/app/quizResults/?${body}`, { headers: headers })
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

    private extractData(data: Response) {
        return JSON.parse(data['_body']);
    }

    //TODO: implement more reasonable error handling
    private handleError(error: Response | any) {
        return Observable.throw(`The server is not available.`);
    }
}
