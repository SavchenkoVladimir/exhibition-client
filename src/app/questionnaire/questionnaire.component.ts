import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'my-app',
    templateUrl: './questionnaire.html',
    styleUrls: ['./questionnaire.css']
})
export class QuestionnaireComponent implements OnInit {
    busibessCartData: any = 'questionnaire';

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.busibessCartData = this.route.snapshot.params;
    }
}