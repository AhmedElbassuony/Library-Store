import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private _Router: Router) { }
  ngOnInit(): void {
    if (!localStorage.getItem("jwt")) {
      this._Router.navigate(["/login"]);
    }
  }

}
