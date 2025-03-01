import { Injectable } from '@angular/core';
import { SignUpForm } from '../interface/sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  postUserData(userData: SignUpForm) {
    const userDataString = JSON.stringify(userData);

    localStorage.setItem('userData', userDataString);
  }

  getUserData() {
    const userDataString = localStorage.getItem('userData');
    return userDataString
  }

}
