import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'todoList', component: TodoListComponent},
    {path: 'homePage', component: HomeComponent}
];
