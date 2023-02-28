/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    assertAllDates(): Chainable<void>;
    assertAllTimes(): Chainable<void>;
    assertInHomeAvailableTimes(): Chainable<void>;
  }
}

// some helper functions
Cypress.Commands.add('assertAllDates', () => {
  cy.get('[data-testid="delivery-date-selector"] > button').eq(0).should('contain', '2023-03-01');
  cy.get('[data-testid="delivery-date-selector"] > button').eq(1).should('contain', '2023-03-02');
  cy.get('[data-testid="delivery-date-selector"] > button').eq(2).should('contain', '2023-03-03');
  cy.get('[data-testid="delivery-date-selector"] > button').eq(3).should('contain', '2023-03-04');
  cy.get('[data-testid="delivery-date-selector"] > button').eq(4).should('contain', '2023-03-05');
});

Cypress.Commands.add('assertAllTimes', () => {
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(0)
    .should('contain', '10:00 - 12:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(1)
    .should('contain', '13:00 - 15:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(2)
    .should('contain', '13:00 - 15:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(3)
    .should('contain', '13:00 - 15:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(4)
    .should('contain', '17:00 - 19:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(5)
    .should('contain', '18:00 - 20:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(6)
    .should('contain', '19:00 - 21:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(7)
    .should('contain', '21:00 - 23:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(8)
    .should('contain', '21:00 - 23:00');
});

Cypress.Commands.add('assertInHomeAvailableTimes', () => {
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(0)
    .should('contain', '13:00 - 15:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(1)
    .should('contain', '13:00 - 15:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(2)
    .should('contain', '18:00 - 20:00');
  cy.get('[data-testid="delivery-time-selector"] > button')
    .eq(3)
    .should('contain', '21:00 - 23:00');
});
