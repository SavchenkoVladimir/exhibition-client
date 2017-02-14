import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-app',
    templateUrl: './questionnaire.html',
    styleUrls: ['./questionnaire.css']
})
export class QuestionnaireComponent implements OnInit {
    businessCartData: any = 'questionnaire';

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.businessCartData = params['businessCartData'] || 'Param is not passed.';
            });
    }
}