import { getStoredTypedUserData } from './typedData';
import { FormControl } from '@angular/forms';

export function typedUserDataValidator(c: FormControl) {
    var typedUserData = getStoredTypedUserData();

    function validate(typedValue, typedUserData) {
        if (typedUserData.indexOf(typedValue) !== -1) {
            return false;
        }
        return true;
    }

    return validate(c.value, typedUserData) ? null : {
        userDataValidator: {
            valid: false
        }
    };
}