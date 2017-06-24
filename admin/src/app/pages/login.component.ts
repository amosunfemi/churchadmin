import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/index';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'login.component.html',
  providers: [AuthenticationService, ToasterService]
})
export class LoginComponent {

  public router: Router;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  model: any = {};
  loading = false;
  error = '';
  authenticationService: AuthenticationService
  private toasterService: ToasterService;

  constructor(router: Router, fb: FormBuilder, private _authService: AuthenticationService) {
    this.router = router;
    this.form = fb.group({
      'email': [
        '', Validators.compose([Validators.required, emailValidator])
      ],
      'password': [
        '', Validators.compose([
          Validators.required, Validators.minLength(6)
        ])
      ]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      //console.log(values); this.router.navigate(['pages/dashboard']);
      this.loading = true;
      this
        ._authService
        .login(this.email.value, this.password.value)
        .subscribe(result => {
          console.log(result);
          if (result === true) {
            this
              .router
              .navigate(['/dashboard']);
          } if (result === false) {
            this.error = 'Username or password is incorrect';
            this.showError(this.error);
            this.loading = false;
          }
        });
    }
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password).subscribe(result => {
      if (result === true) {
        this
          .router
          .navigate(['/']);
      } else {
        this.error = 'Username or password is incorrect';
        
        this.loading = false;
      }
    });
  }

  showSuccess(msg: string) {
    this.toasterService.pop('success', 'Ijosin: Login', msg);
  }

  showError(msg: string) {
    this.toasterService.pop('error', 'Ijosin: Login', msg);
  }

  showWarning(msg: string) {
    this.toasterService.pop('warning', 'Ijosin: Login', msg);
  }

  showInfo(msg: string) {
    this.toasterService.pop('info', 'Ijosin: Login', msg);
  }

  showPrimary(msg: string) {
    this.toasterService.pop('primary', 'Ijosin: Login', msg);
  }


}




export function emailValidator(control: FormControl): {
  [key: string]: any
} {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}