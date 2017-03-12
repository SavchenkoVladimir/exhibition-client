import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { Questionnaire } from '../questionnaire/Questionnaire';

@Component({
    selector: 'my-app',
    templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
    public questionnaireResults: any[] = [];
    public cols: any[];
    public currentPage: number = 0;
    public recordsInPage: number = 2;
    public sortingField: string = "";
    public sortingOrder: string = "";
    public filters: string = "";
    public stacked: boolean;
    public page: any;
    public page1: any;

    constructor(protected _http: HttpService, protected alertService: AlertService) {

    }

    ngOnInit(): void {
        this.getQuestionnaireResults();
        this.cols = [
            { field: 'name', header: 'name', placeholder: "starts with", matchmode: "regex" },
            { field: 'surname', header: 'surname', placeholder: "contain", matchmode: "startsWith" },
            { field: 'organization', header: 'organization', placeholder: "contain", matchmode: "startsWith" },
            { field: 'business', header: 'business', placeholder: "contain", matchmode: "startsWith" },
            { field: 'address', header: 'address', placeholder: "contain", matchmode: "startsWith" },
            { field: 'email', header: 'email', placeholder: "contain", matchmode: "startsWith" },
            { field: 'phone', header: 'phone', placeholder: "contain", matchmode: "startsWith" },
            { field: 'goal', header: 'goal', placeholder: "contain", matchmode: "startsWith" },
        ];
    }

    pageBack(event) {
        event.preventDefault();
        this.currentPage = this.currentPage - 1;
        this.getQuestionnaireResults();
    }

    pageForward(event) {
        event.preventDefault();
        this.currentPage = this.currentPage + 1;
        this.getQuestionnaireResults();
    }

    sort(event) {
        this.sortingOrder = (event.order === -1) ? "-" : "";
        this.sortingField = event.field;
        this.getQuestionnaireResults();
    }

    setFilter(event) {
        var filterQuery = "";

        if (event.filters.name) {
            filterQuery += `&name__regex=/^${event.filters.name.value}/`;
        }
        if (event.filters.email) {
            filterQuery += `&email__regex=/${event.filters.email.value}/i`;
        }
        if (event.filters.goal) {
            filterQuery += `&goal__regex=/${event.filters.goal.value}/i`;
        }
        if (event.filters.location) {
            filterQuery += `&location__equals=${event.filters.location.value}`;
        }

        if (this.filters !== filterQuery) {
            this.filters = filterQuery;
            this.getQuestionnaireResults();
        }
    }

    //TODO: implement more reasonable error handling
    stringEditing(event) {
        this._http.updateQuestionnaireResults(event.data)
            .then(
            data => {
                this.alertService.setAlertSuccess(`The edited string has been updated successfully.`);
            },
            err => { this.alertService.setDangerAlert(`Error string editing. Please, try later.`); }
            );
    }

    toggle() {
        this.stacked = !this.stacked;
    }

    //TODO: implement more reasonable error handling
    getQuestionnaireResults() {
        let body = `sort=${this.sortingOrder}${this.sortingField}&limit=${this.recordsInPage}
            &skip=${this.currentPage * this.recordsInPage}${this.filters}`;
        console.log(body);
        this._http.getQuestionnaireResults(body)
            .subscribe(
            data => {
                this.questionnaireResults = data;
            },
            err => {
                this.alertService.setDangerAlert(err);
            }
            );
    }
}