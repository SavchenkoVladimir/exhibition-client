import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { typedUserDataValidator } from '../validators/typedUserDataValidator';

import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'my-app',
    templateUrl: './questionnaire.html',
    styleUrls: ['./questionnaire.css']
})
export class QuestionnaireComponent implements OnInit {
    businessCartData: any = 'questionnaire';
    form: FormGroup;
    name: FormControl;
    surname: FormControl;
    organization: FormControl;
    business: FormControl;
    address: FormControl;
    email: FormControl;
    phone: FormControl;
    goal: FormControl;

    constructor(protected fb: FormBuilder, protected _http: HttpService,
        protected route: ActivatedRoute, public alertService: AlertService
    ) {
        this.name = new FormControl("", Validators.compose([Validators.required,
        Validators.minLength(3), Validators.maxLength(30), typedUserDataValidator
        ]));
        this.surname = new FormControl("", Validators.compose([Validators.required,
        Validators.minLength(3), Validators.maxLength(30), typedUserDataValidator
        ]));
        this.organization = new FormControl("");
        this.business = new FormControl("");
        this.address = new FormControl("");
        this.email = new FormControl(""/*, Validators.required*/);
        this.phone = new FormControl(""/*, Validators.required*/);
        this.goal = new FormControl(""/*, Validators.required*/);

        this.createForm();
    }

    //TODO: bind form with cardsRecognition service
    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.businessCartData = params['businessCartData'] || 'Param is not passed.';
            });
    }

    createForm() {
        this.form = this.fb.group({
            "name": this.name,
            "surname": this.surname,
            "organization": this.organization,
            "business": this.business,
            "address": this.address,
            "email": this.email,
            "phone": this.phone,
            "goal": this.goal
        });
    }

    //TODO: implement more reasonable error handling
    onSubmit() {
        if (this.form.valid) {
            let formData = this.form.value;

            this._http.insertQuestionnaireResults(formData)
                .then((data) => this.alertService.setAlertSuccess(`Data is saved successfully`))
                .catch((error) => {
                    const message = `The server is not available.`;
                }
                );
        }
    }
}