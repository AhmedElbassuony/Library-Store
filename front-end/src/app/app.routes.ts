import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, title: "Book World" },
    { path: "login", component: LoginComponent, title: "Login" },
    { path: "**", component: NotFoundComponent, title: "404 Not Found" }
];
