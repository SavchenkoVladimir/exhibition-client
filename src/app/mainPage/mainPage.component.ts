import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxModule } from 'primeng/primeng';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

class CustomPopupComponent {
    number: number = 0;
}

@Component({
    selector: 'my-app',
    templateUrl: './mainPage.html',
    styleUrls: ['./mainPage.css']
})

export class MainPageComponent {

//    queryParams;
//    signUpFormData;
    message;
    closeResult: string;
    modelRadio = 'left';
    modelCheckbox = {
        left: true,
        middle: false,
        right: false
    };
    selectedCities: string[] = [];
    selectedCitiesTwo: string[] = [];    
    datepickerModel: NgbDateStruct;

    constructor(private _route: ActivatedRoute, private _modalService: NgbModal) {
        // Get signUp form params
//        this.queryParams = this._route.queryParams;
//        this.signUpFormData = JSON.parse(this.queryParams.value.signUpFormData);
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    //Bootstrap popUp
    open(content) {
        this._modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    //Bootstrap popUp
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    ngOnInit() {
//        console.log(this.signUpFormData.firstName);
    }
}