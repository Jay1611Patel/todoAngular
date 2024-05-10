import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  constructor() {}

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  removeTodo(todo: Todo) {
    this.todos = this.todos.filter(item => item !== todo);
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }
}
