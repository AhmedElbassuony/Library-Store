import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllBooks = (jwt: string) => {
    return this.http.get("http://127.0.0.1:3000/books", {
      headers: {
        "authorization": jwt
      }
    })
  }

  addBookToCart = (jwt: string, bookId: string) => {
    return this.http.put("http://127.0.0.1:3000/users/cart", {bookId}, {
      headers: {
        "authorization": jwt
      }
    })
  }
}
