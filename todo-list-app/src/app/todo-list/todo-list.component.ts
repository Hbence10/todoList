import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import todoListJson from './todo-list.json';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, NgClass, NgFor, NgIf],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  todoList: TodoItem [] = [];
  newTask: string = '';
  editingId: number | null = null; // the identifier of the task what we are currently editing
  editedTask: string = ''; // the task (text) what we are currently editing and we want to save

  // ngOnInit is a lifecycle hook that is called after the component has been initialized (displayed on the screen).
  ngOnInit() {
    // Get the `todoList` from the local storage in the browser
    const localStorageTodoList = localStorage.getItem('todoList');

    // If there is no `todoList` in the local storage, set it to the default value from the JSON file
    if (!localStorageTodoList) {
      localStorage.setItem('todoList', JSON.stringify(todoListJson));
    }

    // If there is a `todoList` in the local storage, parse it and set it to the `todoList` property.
    // If there is no `todoList` in the local storage, set it to an empty array.
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
  }

  addTask(): void {
    if(this.newTask.trim() !== ''){
      const newTodoItem : TodoItem = {
        id : Date.now(),
        task : this.newTask,
        completed: false
      }

      this.todoList.push(newTodoItem)
      this.newTask = ''
      this.updateTodoListInLocalStorage();
    }
  }

  // It's not needed to update the "completed" in this method, because of this: `[(ngModel)]="todoItem.completed"`
  // `ngModel` is a two-way data binding directive that binds the value of the input field to the `completed` property of the `todoItem`.
  toggleCompleted(): void {
    this.updateTodoListInLocalStorage();
  }

  editTask(id: number) {
    // let's find the item we want to edit
    const item = this.todoList.find(item => item.id === id);

    // if the item was found...
    if (item) {
      // ... set the `editingId` to the id of the item we want to edit and set the `editedTask` to the current task (text)
      this.editingId = id;
      this.editedTask = item.task;
    }
  }

  saveTask(id: number) {
    const item = this.todoList.find(item => item.id === id);

    if (item) {
      // upon saving, we update the item's task (text) with the `editedTask` value and reset the `editingId` and `editedTask` properties
      item.task = this.editedTask.trim();
      this.editingId = null;
      this.editedTask = '';
      this.updateTodoListInLocalStorage();
    }
  }

  // this method is called when the user clicks the "Cancel" button in the edit mode, and we reset the `editingId` and `editedTask` properties
  cancelEdit(): void {
    this.editingId = null;
    this.editedTask = '';
  }

  deleteTask(id: number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.updateTodoListInLocalStorage();
  }

  updateTodoListInLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
