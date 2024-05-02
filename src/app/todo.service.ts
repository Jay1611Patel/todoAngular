// todo.service.ts

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

  removeTodoById(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }
}
