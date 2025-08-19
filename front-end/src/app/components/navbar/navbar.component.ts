import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnChanges {
  constructor(private _Router: Router) { }
  user = JSON.parse(localStorage.getItem("user") || "");
  toggleDropMenu() {
    document.getElementById("dropmenu")?.classList.toggle("hidden");
  }
  ngOnInit(): void {
    // console.log(this.user);
    if (!this.user.profilePicture) {
      this.user.profilePicture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3oPvKsA05otgZYGFZmxk5WHLYTFKWOFaNA&s"
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.user = JSON.parse(localStorage.getItem("user") || "");
  }
  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    this._Router.navigate(['/login'])
  }
}
