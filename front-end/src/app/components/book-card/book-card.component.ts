import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Toast, ToastrService } from 'ngx-toastr';


interface IBook {
  _id: string,
  title: string,
  author: string
  category: string[]
  publishedDate?: Date
  summary?: string
  coverImage?: string
  price: number,
  stock: number,
  averageRating: number,
}


@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  constructor(private _ApiService: ApiService, private toastr: ToastrService) { }
  @Input() book?: IBook;
  ngOnInit(): void {
    if (this.book && !this.book.coverImage) {
      this.book.coverImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Op_y-OiUx7_TM4n416lCNOkW4gD8JyN3-Q&s";
    }
    if (this.book && !this.book.summary) {
      this.book.summary = "This Book Has No Summary"
    }
  }
  addtoCart = () => {
    this._ApiService.addBookToCart(localStorage.getItem('jwt') || "", this.book?._id || "").subscribe({
      next: (res: any) => {
        console.log(res);
        let user = JSON.parse(localStorage.getItem("user") || "");
        user.cart = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        this.toastr.success(res.message);
      }, error: (res) => {
        this.toastr.error(res.error.message);
      }
    })
  }
}
