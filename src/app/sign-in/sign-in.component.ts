import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorMessage } from '../enum/enum';
import { SignUpForm } from '../interface/sign-up.model';
import { ServiceService } from '../servies/service.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm!: FormGroup;
  errorMessages = ErrorMessage;
  userData: SignUpForm[] = [];
  hide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    private service: ServiceService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const retrievedData = this.service.getUserData();
    if (retrievedData) {
      this.userData.push(JSON.parse(retrievedData));
    }
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      const matchedUser = this.userData.find(user => user.email === email && user.password === password);

      if (matchedUser) {
        this._snackBar.open('Login Successful!!', 'Done', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['custom-snack-bar'] 
        });
        this.router.navigate(['/home']);
      } else {
        this._snackBar.open('Invalid credentials!!', 'Error', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.signInForm.setErrors({ invalidLogin: true });
      }
    } else {
      console.log('Form is invalid');
      this.signInForm.markAllAsTouched();
    }
  }

  onSignUp() {
    this.dialog.open(SignUpComponent, {
      height: '90vh',
      width: '500px'
    });
  }
}
