'use strict';
import { Validators } from '@angular/forms';

export const percentageVal: any = [
    Validators.required,
    Validators.pattern(/[0-9]?[0-9]?(\.[0-9][0-9]?)?/)
];

export const usernameVal: any = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^[A-Za-z0-9]*$/)
];

//username with spl char
export const usernamesplVal: any = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/)
    // Validators.pattern(/^[A-Za-z0-9]+[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/) // with first char should string
];


export const passwordVal: any = [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.*?^[A-Za-z0-9!<>?/{}\|+-_=@#%$^*()]*$)/)
];

export const mobileVal: any = [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^[6-9][0-9]{9}$/)
];
export const emailVal: any = [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(64),
    // Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-a-z0-9-]+\.[A-Za-z]{2,4}$/)
    // Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/), // old
    // Working in all scenarios - asok@gmail.co.in.co.in.co.in - able to enter
    Validators.pattern(/^([A-Za-z]|[0-9])[A-Za-z0-9._-]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})$/)
    //  old pattern Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
];
// not accpect start and end space
export const fullnameVal: any = [
    Validators.required,
    Validators.pattern(/^[-a-zA-Z-() ]+(\s+[-a-zA-Z-()]+)*$/),
    Validators.minLength(3),
    Validators.maxLength(50)
];

export const req: any = [
    Validators.required
];

export const address: any = [
    Validators.required,
    Validators.pattern(/^.{1,100}$/),
    Validators.minLength(1),
    Validators.maxLength(100)
];


export const pincode: any = [
    // Validators.required,
    Validators.pattern(/^[1-9][0-9]{5}$/),
    Validators.required
];

export const whitespase: any = [
    Validators.pattern(/^(.|\s)*\S(.|\s)*$/),
];

export const textVal: any = [
    Validators.pattern(/^(.|\s)*\S(.|\s)*$/),
    Validators.required
];

export let lowerCaseLetters = /[a-z]/g;
export let upperCaseLetters = /[A-Z]/g;
export let numbers = /[0-9]/g;
export let specialchar = /[^\w\s]/g;
