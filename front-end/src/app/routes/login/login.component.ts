import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private toastr: ToastrService, private _Router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  errors = {
    email: "",
    password: ""
  }

  sendData() {
    if (this.loginForm.controls.email.errors) {
      this.errors.email = "This Email is Not Valid"
    } else {
      this.errors.email = ""
    }
    if (this.loginForm.controls.password.errors) {
      this.errors.password = "Password Should Be More Than 6 Characters"
    } else {
      this.errors.password = ""
    }
    if (this.loginForm.valid) {
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user))
          this.toastr.success(`Login Success! ${res.message}`);
          this._Router.navigate(["/"])
        }, error: (res) => {
          // console.log(res.error);
          this.toastr.error(res.error.message||"Login Failed");
        }
      })
    }
  }
}
