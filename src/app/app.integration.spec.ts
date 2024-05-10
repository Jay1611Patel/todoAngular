import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoService } from './todo.service'; 
import { Todo } from "./todo"; 


class MockTodoService {
  todos: Todo[] = [];

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  removeTodo(todo: Todo) {
    const index = this.todos.findIndex(t => t === todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  getAllTodos() {
    return this.todos;
  }
}

describe('AppComponent Integration Tests', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let todoService: TodoService;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [{ provide: TodoService, useClass: MockTodoService }],
      }).compileComponents();
  
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      todoService = TestBed.inject(TodoService);
      fixture.detectChanges();
    });

    it('Initial todos', () => {
        expect(component.items.length).toBe(4);
    });
    
    it('Add a todo', () => {
      const todo: Todo = { description: 'Test Todo', done: false };
      todoService.addTodo(todo);
      const todos = todoService.getAllTodos();
      expect(todos.length).toBe(1);
      expect(todos[0]).toEqual(todo);
    });
    
    it('Remove a todo', () => {
      const todo: Todo = { description: 'Test Todo', done: false };
      todoService.addTodo(todo);
      let todos = todoService.getAllTodos();
      expect(todos.length).toBe(1);
      
      todoService.removeTodo(todo);
      todos = todoService.getAllTodos();
      expect(todos.length).toBe(0);
    });

    it('should mark a todo as done', () => {
      const todo: Todo = { description: 'Test Todo', done: false };
    
      todoService.addTodo(todo);
      
      const todosBeforeMarkingDone = todoService.getAllTodos();
      expect(todosBeforeMarkingDone.length).toBe(1);
    
      const todoToMarkDone = todosBeforeMarkingDone[0];
      todoToMarkDone.done = true;
    
      const todosAfterMarkingDone = todoService.getAllTodos();
    
      expect(todosAfterMarkingDone.length).toBe(1);
    
      expect(todosAfterMarkingDone[0].done).toBe(true);
    });
    

    it('Checking to remove non-existing todo', () => {
      const todo: Todo = { description: 'Test Todo', done: false };
      const nonExistingTodo: Todo = { description: 'Non-existing Todo', done: false };
      todoService.addTodo(todo);
      
      let todos = todoService.getAllTodos();
      expect(todos.length).toBe(1);
      
      todoService.removeTodo(nonExistingTodo); 
      todos = todoService.getAllTodos();
      expect(todos.length).toBe(1);
    });

    it('Filter todos to show only done todos', () => {
      const todos: Todo[] = [
        { description: 'Task 1', done: true },
        { description: 'Task 2', done: false },
        { description: 'Task 3', done: true },
        { description: 'Task 4', done: false }
      ];
  
      todos.forEach(todo => todoService.addTodo(todo));
  
      const doneTodos = todoService.getAllTodos().filter(todo => todo.done);
      expect(doneTodos.length).toBe(2);
      doneTodos.forEach(todo => {
        expect(todo.done).toBe(true);
      });
    });

    it('Do not add todo with empty description', () => {
      const initialTodos = component.items.length;
      component.addItem('');
      expect(component.items.length).toBe(initialTodos);
    });

    it('Add multiple todos', () => {
      const newTodos: Todo[] = [
        { description: 'Task 1', done: false },
        { description: 'Task 2', done: true },
        { description: 'Task 3', done: false }
      ];
      
      newTodos.forEach(todo => todoService.addTodo(todo));
      const todos = todoService.getAllTodos();
      
      expect(todos.length).toBe(newTodos.length);
      newTodos.forEach((newTodo, index) => {
        expect(todos[index].description).toBe(newTodo.description);
        expect(todos[index].done).toBe(newTodo.done);
      });
    });

    it('Edit the description of a todo item', () => {
      const initialTodo: Todo = { description: 'Initial Description', done: false };
      const updatedDescription = 'Updated Description';
    
      todoService.addTodo(initialTodo);
      
      const todosBeforeEdit = todoService.getAllTodos();
      expect(todosBeforeEdit.length).toBe(1);
    
      const todoToUpdate = todosBeforeEdit[0];
      todoToUpdate.description = updatedDescription;
    
      const todosAfterEdit = todoService.getAllTodos();
    
      expect(todosAfterEdit.length).toBe(1);
    
      expect(todosAfterEdit[0].description).toBe(updatedDescription);
    });
    

    // Test case fails as it should technically not add duplicate todo
    it('Do not add duplicate todos', () => {
      const todo: Todo = { description: 'Duplicate Todo', done: false };
      
      todoService.addTodo(todo);
      todoService.addTodo(todo);
      
      const todos = todoService.getAllTodos();
      
      expect(todos.length).toBe(1);
      
      expect(todos[0].description).toBe(todo.description);
      expect(todos[0].done).toBe(todo.done);
    });
    
  
  });
  
