
describe('Adding a Todo', () => {
  it('should add a new todo', () => {
    cy.visit('/');
    cy.get('#addItemInput').type('Buy groceries{enter}');
    
    // Wait for the app-item to be added and become visible
    cy.get('app-item', { timeout: 10000 }).should('exist').and('be.visible');

    // Now make assertions on the todo item
    cy.get('app-item').should('contain', 'Buy groceries');
  });
});

describe('Deleting a Todo', () => {
  it('should delete a todo', () => {
    cy.visit('/');
    cy.get('.btn-warn').first().click(); // Assuming the first delete button deletes the first todo
    cy.get('app-item').should('have.length', 3); // Assuming there were initially four todos
  });
});

describe('Editing a Todo', () => {
  it('should edit a todo', () => {
    // Visit the app
    cy.visit('/');

    // Find the first app-item and click the Edit button
    cy.get('app-item').first().within(() => {
      cy.get('.btn').contains('Edit').click();
      
      // Wait for the edit input field to appear and then interact with it
      cy.get('input[placeholder="edit item"]').should('exist').clear().type('Buy fresh groceries{enter}');
    });

    // Wait for the edited todo item to appear with the updated description
    cy.contains('Buy fresh groceries').should('exist');
  });
});


describe('Marking a Todo as Done and Checking "Done" Tab', () => {
  it('should mark a todo as done and check "Done" tab', () => {
    // Visit the app
    cy.visit('/');

    // Add a new todo
    const newTodoText = 'New task';
    cy.get('#addItemInput').type(`${newTodoText}{enter}`);

    // Find the newly added todo item and mark it as done (using {force: true} to disable error checking)
    cy.contains('app-item', newTodoText).within(() => {
      cy.get('input[type="checkbox"]').check({ force: true });
    });

    // Click on the "Done" tab
    cy.contains('Done').click();

    // Verify that the newly added todo appears in the "Done" tab
    cy.contains('app-item', newTodoText).should('exist');
  });
});


describe('Clearing done Todos', () => {
  it('should clear done todos', () => {
    // Visit the app
    cy.visit('/');

    // Mark some todos as done
    cy.get('app-item input[type="checkbox"]').eq(0).check(); // Mark first todo as done

    // Click on the "Clear Completed" button
    cy.contains('Done').click();

    // Assert that completed todos are removed
    cy.get('app-item').should('have.length', 1); // Adjust the length based on your test data
    cy.contains('app-item', 'eat').should('exist');
    cy.get('app-item button.btn-warn').click({ multiple: true });
    cy.contains('app-item', 'eat').should('not.exist'); // Verify that the completed todo is removed
  });
});


describe('Checking done Todos from todo tab', () => {
  it('should remove done todos', () => {
    cy.visit('/');
    cy.get('button.btn-menu').contains('To Do').click();

    cy.contains('app-item', 'sleep').within(() => {
      cy.get('input[type="checkbox"]').check({ force: true });
    });

    cy.contains('app-item', 'sleep').should('not.exist');
  });
});


describe('Undoing Todos from Done tab', () => {
  it('Undo todos from Done tab', () => {
    cy.visit('/');

    const newTodoText = 'New task';
    cy.get('#addItemInput').type(`${newTodoText}{enter}`);

    // Find the newly added todo item and mark it as done (using {force: true} to disable error checking)
    cy.contains('app-item', newTodoText).within(() => {
      cy.get('input[type="checkbox"]').check({ force: true });
    });

    cy.contains('Done').click();

    cy.contains('app-item', newTodoText).should('exist');

    cy.contains('app-item', newTodoText).within(() => {
      cy.get('input[type="checkbox"]').uncheck({ force: true });
    });

    cy.contains('app-item', newTodoText).should('not.exist');
  });
});







