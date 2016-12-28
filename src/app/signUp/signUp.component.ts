import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { typedUserDataValidator } from '../validators/typedUserDataValidator';
import { HttpService } from '../http/http.service';
import { typedUserData } from '../validators/typedData';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from "@angular/router";
import { AlertService } from '../helpers/alert.service';

@Component({
    selector: 'my-app',
    templateUrl: './signUpForm.html'
})

export class SignUpComponent {
    private sendFormAttempts = 10;
    private dataSendAttemptsCounter: number;

    constructor(fb: FormBuilder, private _http: HttpService,
        private _completerService: CompleterService, public alertService: AlertService
    ) {
        setInterval(() => { this.sendLocalData(); }, 30000);
        this.form = fb.group({
            "name": this.name,
            "email": this.email,
            "goal": this.goal,
            "location": this.location
        });
        this.dataService = this._completerService.local(this.searchData, 'country', 'country');
    }

    // TypeAhead config
    private dataService: CompleterData;
    private searchData = [
        { country: 'USA' },
        { country: 'Great Britain' },
        { country: 'Mexico' },
        { country: 'Japan' },
        { country: 'France' },
        { country: 'Brasilia' },
        { country: 'Argentina' }
    ];

    // Form config
    form: FormGroup;

    name = new FormControl("", Validators.compose([Validators.required,
    Validators.minLength(3), Validators.maxLength(30), typedUserDataValidator
    ]));
    email = new FormControl(""/*, Validators.required*/);
    goal = new FormControl(""/*, Validators.required*/);
    location = new FormControl(""/*, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]{5}')])*/);

    onSubmit() {
        if (this.form.valid) {
            let formData = this.form.value;

            this._http.insertQuizResults(formData)
                .subscribe(
                data => {
                    this.alertService.setAlertSuccess(`Data is saved successfully`);
                },
                err => {
                    this.putFormLocal(formData);
                }
                );
        }
    }

    putFormLocal(formData) {
        let storedData = localStorage.getItem('filled_forms');
        var decodedStoredData: any = [];

        if (storedData) {
            var decodedStoredData = JSON.parse(storedData);
        }

        decodedStoredData.push(formData);
        var encoded = JSON.stringify(decodedStoredData);
        localStorage.setItem('filled_forms', encoded);

        const message = `The Internet connection is failed. Your form data are saved locally.
         You need to get connection to save the data.`;
        this.alertService.setDangerAlert(message);
    }

    sendLocalData() {
        let storedData = localStorage.getItem('filled_forms');
        if (storedData) {
            var decodedLocalData = JSON.parse(storedData);
            var counter = 0;

            for (var i = 0; i < decodedLocalData.length; i++) {
                this._http.insertQuizResults(decodedLocalData[i])
                    .subscribe(
                    data => {
                        counter = i;
                        if (i === decodedLocalData.length) {
                            localStorage.removeItem('filled_forms');
                            this.alertService.setAlertSuccess(`All your data has sent to the server.`);
                        }
                    },
                    err => {
                        let dataLeftover = decodedLocalData.slice(0, i);
                        localStorage.setItem('filled_forms', JSON.stringify(dataLeftover));
                        this.dataSendAttemptsCounter++;

                        if (Number.isInteger(this.dataSendAttemptsCounter / this.sendFormAttempts)) {
                            const message = `You have unsaved data. You have to get the Internet connection to save data.`;
                            this.alertService.warningAlert(message);
                        }
                    }
                    );
            }
        }
    }
}
