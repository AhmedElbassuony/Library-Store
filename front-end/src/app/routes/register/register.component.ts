import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private toastr: ToastrService, private _Router: Router) { }


  registerForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    address: new FormControl(null),
    phone: new FormControl(null),
    profilePicture: new FormControl(null),
    gender: new FormControl("male", [Validators.required]),
  })

  errors = {
    username: "",
    email: "",
    password: ""
  }


  sendData() {
    if (this.registerForm.controls.username.errors) {
      this.errors.username = "Username Should Be More Than 3 Characters"
    } else {
      this.errors.username = ""
    }
    if (this.registerForm.controls.email.errors) {
      this.errors.email = "This Email is Not Valid"
    } else {
      this.errors.email = ""
    }
    if (this.registerForm.controls.password.errors) {
      this.errors.password = "Password Should Be More Than 6 Characters"
    } else {
      this.errors.password = ""
    }
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      this, this._AuthService.register(this.registerForm.value).subscribe({
        next: (res) => {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user))
          this.toastr.success(`Login Success! ${res.message}`);
          this._Router.navigate(["/"])
        }
        , error: (res) => {
          this.toastr.error(res.error.message || "Registration Failed");
        }
      })
    }
  }
}
