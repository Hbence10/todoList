import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import todoListJson from './todo-list.json';

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  // VALTOZOK:
  todoList: TodoItem[] = []; //todolist
  editingId: number | null = null; //az edithez szukseges id, lenyege: ez alapjan fog megjelenni az input az edithez

  ngOnInit() {
    //1. megnezi, hogy van-e olyan valtozo lementve a local storage-ba hogy todoList
    const localStorageTodoList = localStorage.getItem('todoList');

    // ha nincs akkor letrehozza, azzal a listaval ami a JSON-ba van lementve
    if (!localStorageTodoList) {
      localStorage.setItem('todoList', JSON.stringify(todoListJson));
    }

    //2. lementi a todoList valtozoba a local storage elemet
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
  }

  //task hozza adasa:
  addTask(newTask: string): void {
    if (newTask.length) {                 //csak akkor adja hozza ha irt valamit az inputba
      const newTodoItem: TodoItem = {     //letrehozza az uj elemet
        id: Date.now(),
        task: newTask,
        completed: false,
      };

      this.todoList.push(newTodoItem); //hozzaadja a listahoz
      this.updateTodoListInLocalStorage();
    }

  }

  //kesznek jeloli
  toggleCompleted(): void {
    this.updateTodoListInLocalStorage();
  }

  editTask(wantedItem: TodoItem) {
    this.editingId = wantedItem.id;
  }

  saveTask(wantedItem: TodoItem) {
    this.editingId = null;
    this.updateTodoListInLocalStorage();
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  //id alapjan kikeresi a listabol az elemet
  deleteTask(id: number) {
    this.todoList = this.todoList.filter((item) => item.id !== id); //csak az fog benne lenni a listaban aminek az id-ja nem fog vele egyezni
    this.updateTodoListInLocalStorage();
  }

  //ujra feltolti local storageba a listat
  updateTodoListInLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
