describe("Authentication Tests", () => {
  it("should log in and redirect to home", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("password123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should log out and redirect to login", () => {
    cy.visit("/");
    cy.get("button").contains("Logout").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });
});
