describe("TodoList CRUD Operations", () => {
  it("should create, edit, and delete a TodoList", () => {
    cy.visit("/");

    // CREATE FLOW
    cy.get('[data-testid="create-list-button"]').click();

    cy.get('[id="input"]').type("New List");

    cy.get("button").contains("Submit").click();

    cy.get('[data-testid="lists-table"]')
      .find('[data-testid="list-row-newlist"]')
      .find("th")
      .contains("New List")
      .should("exist");

    // EDIT FLOW
    cy.get('[data-testid="lists-table"]')
      .find('[data-testid="list-row-newlist"]')
      .find('button[aria-label="edit/delete"]')
      .click();

    cy.get("body")
      .find('[role="tooltip"]')
      .within(() => {
        cy.contains('[role="button"]', "Edit").click();
      });

    cy.get('[value="New List"]').clear().type("Updated List");

    cy.get("button").contains("Submit").click();

    cy.get('[data-testid="lists-table"]')
      .find('[data-testid="list-row-newlist"]')
      .should("not.exist");

    cy.get('[data-testid="lists-table"]')
      .find('[data-testid="list-row-updatedlist"]')
      .should("exist");

    // DELETE FLOW
    cy.get('[data-testid="lists-table"]')
      .find('[data-testid="list-row-updatedlist"]')
      .find('button[aria-label="edit/delete"]')
      .click();

    cy.get("body")
      .find('[role="tooltip"]')
      .within(() => {
        cy.contains('[role="button"]', "Delete").click();
      });

    cy.get('[data-testid="lists-table"]')
      .find('[data-testid="list-row-updatedlist"]')
      .should("not.exist");
  });
});
