/// <reference types="cypress" />

describe('basic scheduler tests', () => {
  it('launches', () => {
    cy.visit('/');
  })
  it('contains content', () => {
    cy.visit('/');
    cy.get('[data-cy=courseCard]').should('contain', 'Fall CS');
  })
  it('shows Winter courses when Winter is selected', () => {
    cy.visit('/');
    cy.get('[data-cy=winterButton]').click();
    cy.get('[data-cy=courseCard]').should('contain', 'Winter CS');
  });
})
