import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
    public alert: {};

    constructor() {
        this.alert = {
            type: '',
            message: ''
        };
    }

    setAlertSuccess(message) {
        this.displayAlert('success', message);
    }

    warningAlert(message) {
        this.displayAlert('warning', message);
    }

    setDangerAlert(message) {
        this.displayAlert('danger', message);
    }

    closeAlert() {
        this.alert = {
            type: '',
            message: ''
        };
    }

    displayAlert(alertType, message) {
        this.alert = {
            type: alertType,
            message: message,
        };
    }

}