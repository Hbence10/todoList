import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  todoList  : TodoItem [] = [];
  newTask: string=''

  addTask():void{
    if(this.newTask.trim() !== ''){
      const  newTodoItem : TodoItem = {
        id : Date.now(),
        task : this.newTask,
        completed: false
      }

      this.todoList.push(newTodoItem)
      this.newTask = ''
    }
  }

  toggleCompleted(id : number):void{
    const todoItem = this.todoList.find(item => item.id === id);
    if(todoItem){
      todoItem.completed = !todoItem.completed;
    }
  }

  editTask(id : number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }

  deleteTask(id : number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }

}