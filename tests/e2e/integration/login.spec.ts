describe('Login Page', () => {
  it('Login', function test() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/api/v1/users/me',
      status: 401,
      response: {
      }
    });
    cy.visit('http://localhost:3333/login');
    cy.get('h3').should('be.visible').and('have.text', 'Welcome to Restaurant Review');

    cy.get(`[data-cy=login-submit]`).click();

    cy.get('[data-cy=login-username]').type('test@email');
    cy.get('[data-cy=login-password]').type('testpassword');

    cy.mock();
    cy.get(`[data-cy=login-submit]`)
      .click()
      .should('not.exist');
  });
});
