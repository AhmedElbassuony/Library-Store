import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ILoginData {
  email?: string | null,
  password?: string | null
}
interface IUser {
  username?: string | null,
  email?: string | null,
  password?: string | null,
  gender?: string | null,
  address?: string | null,
  phone?: string | null,
  profilePicture?: string | null,
  dateOfBirth?: Date | null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: ILoginData): Observable<any> {
    return this.http.post("http://127.0.0.1:3000/users/signin", data);
  }
  register(data: IUser): Observable<any> {
    return this.http.post("http://127.0.0.1:3000/users", data);
  }
  logout(){
    localStorage.removeItem("jwt");
  }
}
