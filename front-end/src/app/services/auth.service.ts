import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ILoginData {
  email?: string | null,
  password?: string | null
}
interface IUser {
  username: string,
  email: string,
  password: string,
  gender: "male" | "female",
  address?: string,
  phone?: string,
  profilePicture?: string,
  dateOfBirth?: Date
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
