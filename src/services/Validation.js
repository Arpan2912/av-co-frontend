export default class Validation {
  static emailValidator1(email) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email) {
      if (email.match(pattern)) {
        return null;
      }
      return { error: true, errorMsg: 'Email is not valid' };
    }
    return { error: true, errorMsg: 'Email is not valid' };
    // return resolve(null);
  }

  static emailValidator(control) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (control.value === null || control.value === '') {
      control.invalidEmail = false;
      return control;
    }
    if (control.value) {
      if (control.value.match(pattern)) {
        control.invalidEmail = false;
        return control;
      }
      control.invalidEmail = true;
      return control;
    }
    control.invalidEmail = true;
    return control;
    // return resolve(null);
  }


  /**
     * @description password validator
     * @param control
     */
  static numberValidatior(number) {
    const pattern = /(^[0-9]+\.([0-9])+|^[0-9]+)$/;
    if (number) {
      const number1 = number ? number.trim() : '';
      if (number1.length === 0) {
        return { error: true, errorMsg: 'Value should not be empty' };
      } else if (number === 0) {
        return { error: true, errorMsg: 'Value should not 0' };
      } else if (!pattern.test(number)) {
        return { error: true, errorMsg: 'Value you entered is incorrect' };
      }
      return null;
    }
    return { error: true, errorMsg: 'Value should not be empty' };

  }

  static notNullValidator(control) {
    if (control.value === null || control.value === '' || control.value === undefined) {
      control.nullValue = true;
      return control;
    } else {
      control.nullValue = false;
      return control;
    }
  }

  static validatePhoneNumber(control) {
    const regex = /^[0-9]*$/;
    const value = control.value;
    if (!(value === null || value === '')) {
      if (value.length !== 10) {
        control.invalidPhone = true;
        return control;
      }
      if (!value.match(regex)) {
        control.invalidPhone = true;
      } else {
        control.invalidPhone = null;
      }
    } else {
      control.invalidPhone = null;
    }
    return control;
  }
}
