import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';  
import { Item } from './item'; 

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],  
      declarations: [],  
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('Have default componentTitle value', () => {
    expect(component.componentTitle).toEqual('My To Do List');
  });

  it('Add an item to the list', () => {
    const initialItemCount = component.allItems.length;
    component.addItem('New Item');
    expect(component.allItems.length).toEqual(initialItemCount + 1);
    expect(component.allItems[0].description).toEqual('New Item');
  });

  it('Delete an item from the list', () => {
    const initialItemCount = component.allItems.length;
    const itemToRemove: Item = { description: 'Item to remove', done: false };
    component.allItems.push(itemToRemove);
    fixture.detectChanges();
  
    component.remove(itemToRemove); 
    expect(component.allItems.length).toEqual(initialItemCount); 
    expect(component.allItems.includes(itemToRemove)).toBeFalse(); 
  });

  it('Filter items', () => {
    component.allItems = [
      { description: 'Item 1', done: true },
      { description: 'Item 2', done: false },
      { description: 'Item 3', done: true },
    ];
    component.filter = 'done';
    expect(component.items.length).toEqual(2);
    expect(component.items.every(item => item.done)).toBeTrue();
  });

  it('Remove items from list', () => {
    const itemToRemove: Item = { description: 'Item to remove', done: false };
    component.allItems.push(itemToRemove);
    component.remove(itemToRemove);
    expect(component.allItems.includes(itemToRemove)).toBeFalse();
  });

  it('Update item count', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('4 items');
    component.allItems.pop(); 
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('3 items');
  });
  
  it('Filter items when "All" filter is selected', () => {
    component.allItems = [
      { description: 'Item 1', done: true },
      { description: 'Item 2', done: false },
      { description: 'Item 3', done: true },
    ];
    component.filter = 'all'; 
    fixture.detectChanges(); 
  
    const itemsList = fixture.nativeElement.querySelectorAll('app-item');
    expect(itemsList.length).toEqual(3); 
  });
  
  it('Filter items when "To Do" filter is selected', () => {
    component.allItems = [
      { description: 'Item 1', done: true },
      { description: 'Item 2', done: false },
      { description: 'Item 3', done: true },
    ];
    component.filter = 'active'; 
    fixture.detectChanges(); 
  
    const itemsList = fixture.nativeElement.querySelectorAll('app-item');
    expect(itemsList.length).toEqual(1); 
  });
  
  it('Filter items when "Done" filter is selected', () => {
    component.allItems = [
      { description: 'Item 1', done: true },
      { description: 'Item 2', done: false },
      { description: 'Item 3', done: true },
    ];
    component.filter = 'done';
    fixture.detectChanges();
  
    const itemsList = fixture.nativeElement.querySelectorAll('app-item');
    expect(itemsList.length).toEqual(2); 
  });
  
});
