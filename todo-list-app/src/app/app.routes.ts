import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },           // default route ("/")
  {path: 'todoList', component: TodoListComponent}, // "/todoList" route
];
