import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { HomeComponent } from './routes/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginRedirectGuard } from './guard/login-redirect.guard';
import { BooksComponent } from './routes/books/books.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "", component: HomeComponent, title: "Book World", canActivate: [AuthGuard],
        children: [
            { path: "", component: BooksComponent },
            { path: "dashboard", component: DashboardComponent ,title:"Dashoboard"}
        ]
    },
    { path: "login", component: LoginComponent, title: "Login", canActivate: [LoginRedirectGuard] },
    { path: "**", component: NotFoundComponent, title: "404 Not Found" }
];
