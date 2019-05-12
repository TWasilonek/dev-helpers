describe('Text page', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('greets with Text transformations', function() {
    cy.contains('h1', 'Text transformations');
  });

  it('starts with a placeholder inside the text input', function() {
    cy.get('[data-testid=text-input]')
      .should('have.attr', 'placeholder', 'Lorem ipsum');
  });

  it('starts with no quotes option', function() {
    cy.contains('label', 'No quotes')
      .siblings('input[type=radio]')
      .should('be.checked');
  });
});
