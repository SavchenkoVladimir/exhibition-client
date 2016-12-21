import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { HttpService } from '../http/http.service';
import { AlertService } from '../helpers/alert.service';
import { Col } from '../helpers/col.declaration';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-app',
    templateUrl: './dashboard.html'
})

export class DashboardComponent implements OnInit {
    public quizResults: any[] = [];
    public cols: Col[];
    public currentPage: number = 0;
    public recordsInPage: number = 2;
    public sortingField: string = "";
    public sortingOrder: string = "";
    public filters: string = "";
    public stacked: boolean;
    public page: any;
    public page1: any;

    constructor(private _http: HttpService, public alertService: AlertService) {

        // This is a way to owerwrite libruary class property
        DataTable.prototype.filter = function(value, field, matchMode) {

            this.filterConstraints.equals = function(value, filter) { };
            this.filterConstraints.regex = function(value, filter) { };

            if (!this.isFilterBlank(value))
                this.filters[field] = { value: value, matchMode: matchMode };
            else if (this.filters[field])
                delete this.filters[field];
            if (this.lazy) {
                this.stopFilterPropagation = true;
            }
            this._filter();
        };
        //-----------------------------  
    }

    ngOnInit(): void {
        this.getQuizResults();
        this.cols = [
            { field: 'name', header: 'name', placeholder: "starts with" },
            { field: 'email', header: 'email', placeholder: "contain" },
            { field: 'goal', header: 'goal', placeholder: "contain" },
            { field: 'location', header: 'location', placeholder: "equals" }
        ];
    }

    pageBack(event) {
        event.preventDefault();
        this.currentPage = this.currentPage - 1;
        this.getQuizResults();
    }

    pageForward(event) {
        event.preventDefault();
        this.currentPage = this.currentPage + 1;
        this.getQuizResults();
    }

    sort(event) {
        this.sortingOrder = (event.order === -1) ? "-" : "";
        this.sortingField = event.field;
        this.getQuizResults();
    }

    setFilter(event) {
        var filterQuery = "";

        // Debug info
        console.log(event);

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
            this.getQuizResults();
        }
    }

    stringEditing(event) {

        this._http.updateQuizResults(event.data)
            .subscribe(
            data => {
                this.alertService.setAlertSuccess(`The edited string has been updated successfully.`);
            },
            err => { this.alertService.setDangerAlert(`Error string editing. Please? try later.`); }
            );
    }

    toggle() {
        this.stacked = !this.stacked;
    }

    getQuizResults() {

        let body = `sort=${this.sortingOrder}${this.sortingField}&limit=${this.recordsInPage}
            &skip=${this.currentPage * this.recordsInPage}${this.filters}`;

        this._http.getQuizResults(body)
            .subscribe(
            data => {
                this.quizResults = JSON.parse(data['_body']);

                // Debug info
                console.log(data);
            },
            err => {
                // Has to be handled reasonably
                console.log(err);
            }
            );
    }
}