import { QUOTES_TYPES, PLACEHOLDER_TEXT } from '../../src/constants';

describe('Text page', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('greets with Text transformations', function() {
    cy.contains('h1', 'Text transformations');
  });

  it('starts with a placeholder inside the text input', function() {
    cy.get('[data-testid=text-input]')
      .should('have.attr', 'placeholder', PLACEHOLDER_TEXT);
  });

  it('starts with no quotes option', function() {
    cy.contains('label', 'No quotes')
      .siblings('input[type=radio]')
      .should('be.checked');
  });

  describe('Text transformations', function() {
    it('shows the correct number of transformation variants', function() {

    });

    it('shows the correct transformation names', function() {

    });

    it('shows the correct transformation placeholder', function() {

    });

    // TODO: transform text and check results
    // TODO: add quotes of different types and check results
  });
});
