'use strict';
import { Validators } from "@angular/forms";
// 'use strict';
export const usernameVal: any = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^[A-Za-z0-9]*$/)]

export const passwordVal: any = [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.*?^[A-Za-z0-9!<>?/{}\|+-_=@#%$^*()]*$)/)
]

export const mobileVal: any = [
    Validators.required,
    Validators.minLength(10), 
    Validators.maxLength(10), 
    Validators.pattern(/^[6-9][0-9]{9}$/)
]
export const emailVal: any = [
    Validators.required, 
    Validators.minLength(6), 
    Validators.maxLength(64), 
    Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
]
// not accpect start and end space 
export const fullnameVal: any = [
    Validators.required, 
    Validators.pattern(/^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/),
     Validators.minLength(3),
      Validators.maxLength(50)
]