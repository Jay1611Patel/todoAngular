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
    
    it('Add a todo to the list', () => {
        component.addItem('New Todo');
        expect(component.items.length).toBeGreaterThan(0);
      });
    
      it('Remove a todo from the list', () => {
        const todo: Todo = { id: '5', description: 'Test Todo', done: false };
        let len = component.items.length
        todoService.addTodo(todo);        
        expect(component.items.length).toBe(len + 1);
    
        component.remove(todo);
        expect(component.items.length).toBe(len);
      });
  
      it('Filter todos', () => {
        const todos: Todo[] = [
          { id: '1', description: 'Todo 1', done: false },
          { id: '2', description: 'Todo 2', done: true },
          { id: '3', description: 'Todo 3', done: false },
        ];
        todos.forEach(todo => todoService.addTodo(todo));
        let len = component.items.length;
        component.filter = 'done';
        
        expect(component.items.length).toBe(1);
    
        component.filter = 'active';
        expect(component.items.length).toBeGreaterThan(2);
      });
    
      it('Do not add todo with empty description', () => {
        const initialTodos = component.items.length;
        component.addItem('');
        expect(component.items.length).toBe(initialTodos);
      });
  });
  
