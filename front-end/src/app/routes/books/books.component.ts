import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-books',
  imports: [BookCardComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
[x: string]: any;
  constructor(private _ApiService: ApiService) { }
  books: any;
  errors: any;
  ngOnInit(): void {
    this._ApiService.getAllBooks(localStorage.getItem("jwt") || "").subscribe({
      next: (res: any) => {
        // console.log(res.data);
        this.books = res.data;
      },
      error: (res) => {
        // console.log(res.error)
        this.errors = res.error
      }
    });
  }
}
