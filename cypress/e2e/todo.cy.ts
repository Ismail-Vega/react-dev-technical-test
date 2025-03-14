describe("TodoItem CRUD Operations", () => {
  it("should create, update, and delete a TodoItem", () => {
    cy.visit("/");
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/todos").as(
      "getTodos"
    );
    cy.wait("@getTodos");

    cy.get('[data-testid="desktop-drawer"]')
      .find('[data-testid="list-nav-item-text-list1"]')
      .click();

    cy.get('[data-testid="add-task-button"]').click();

    cy.get('[data-testid="app-form-input"]')
      .find('[id="input"]')
      .type("New Todo");

    cy.get('[data-testid="app-form-confirm-button"]').click();

    cy.contains('[data-testid^="todo-item-title-"]', "New Todo").should(
      "exist"
    );

    cy.get('[data-testid="todo-item-title-1"]').click();
    cy.get('[data-testid="todo-item-title-1"]')
      .invoke("attr", "style")
      .should("include", "text-decoration: line-through");

    cy.get('[data-testid="todo-item-title-1"]').click();
    cy.get('[data-testid="todo-item-title-1"]')
      .invoke("attr", "style")
      .should("not.include", "text-decoration: line-through");

    cy.get('[data-testid="todo-item-delete-button-1"]').click();

    cy.get('[data-testid="confirm-button"]').click();

    cy.get('[data-testid="todo-item-title-1"]').should("not.exist");
  });
});
