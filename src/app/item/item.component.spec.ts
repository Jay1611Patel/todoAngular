import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component'; 
import { Item } from '../item'; 

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule], 
      declarations: [], 
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    component.item = { description: 'Test Item', done: false }; 

    fixture.detectChanges();
  });

  it('Create component', () => {
    expect(component).toBeTruthy();
  });

  it('Display the item description', () => {
    const item: Item = { description: 'Test Item', done: false };
    component.item = item;
    fixture.detectChanges();

    const itemDescription = fixture.nativeElement.querySelector('label').textContent;
    expect(itemDescription).toContain(item.description);
  });

  it('Remove event when delete button is clicked', () => {
    const item: Item = { description: 'Test Item', done: false };
    component.item = item;
    fixture.detectChanges();

    const removeSpy = spyOn(component.remove, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.btn-warn');
    deleteButton.click();

    expect(removeSpy).toHaveBeenCalled();
  });

  it('Toggle done state when checkbox is clicked', () => {
    const item: Item = { description: 'Test Item', done: false };
    component.item = item;
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();

    expect(component.item.done).toBeTrue();
  });

  it('Enter edit mode when edit button is clicked', () => {
    const item: Item = { description: 'Test Item', done: false };
    component.item = item;
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('.btn');
    editButton.click(); 

    expect(component.editable).toBeTrue();
  });

  it('Cancel edit mode when cancel button is clicked', () => {
    const item: Item = { description: 'Test Item', done: false };
    component.item = item;
    fixture.detectChanges();

    component.editable = true;
    fixture.detectChanges();

    const cancelButton = fixture.nativeElement.querySelector('.btn');
    cancelButton.click();

    expect(component.editable).toBeFalse();
  });

});
