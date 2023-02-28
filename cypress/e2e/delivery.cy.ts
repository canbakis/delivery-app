const apiUrl = 'https://api.mathem.io/mh-test-assignment/delivery';

describe('template spec', () => {
  beforeEach(() => {
    // run against vite preview server
    cy.visit('http://localhost:4173/');

    cy.intercept('GET', `${apiUrl}/dates`, { fixture: 'dates.json' }).as('getDates');
    cy.intercept('GET', `${apiUrl}/times/*`, { fixture: 'times.json' }).as('getTimes');
  });

  it('should load and display delivery page', () => {
    cy.get('h1').contains('Select Delivery Time');

    cy.get('[data-testid="in-home-delivery-checkbox"]').should('contain', 'In Home Delivery');
    cy.get('[data-testid="delivery-date-selector-loading"]').should('exist');
    cy.get('[data-testid="delivery-time-selector-loading"]').should('exist');

    cy.wait('@getDates');
    cy.get('[data-testid="delivery-date-selector-loading"]').should('not.exist');

    cy.assertAllDates();

    cy.get('[data-testid="delivery-date-selector"] button.selected').should('exist');

    cy.get('[data-testid="delivery-time-selector"] > button')
      .eq(0)
      .should('contain', '10:00 - 12:00');

    cy.wait('@getTimes');
    cy.get('[data-testid="delivery-time-selector-loading"]').should('not.exist');

    cy.assertAllTimes();
  });

  it('should be able to select a delivery date', () => {
    cy.get('[data-testid="delivery-date-selector"] > button').eq(1).click();
    cy.get('[data-testid="delivery-date-selector"] > button')
      .eq(1)
      .should('have.class', 'selected');
  });

  it('should be able to select a delivery time for the selected delivery date', () => {
    cy.get('[data-testid="delivery-time-selector"] > button').eq(1).click();
    cy.get('[data-testid="delivery-time-selector"] > button')
      .eq(1)
      .should('have.class', 'selected');
  });

  it('should be able to tick/untick a checkbox for wanting In Home delivery.', () => {
    cy.get('[data-testid="in-home-delivery-checkbox"]').click();
    cy.assertInHomeAvailableTimes();

    cy.get('[data-testid="in-home-delivery-checkbox"]').click();
    cy.assertAllTimes();
  });

  it('should be able to proceed to a confirmation/summary page showing the selected information', () => {
    cy.get('[data-testid="delivery-selector-next-button"]').should('be.disabled');

    cy.get('[data-testid="delivery-date-selector"] > button').eq(0).click();
    cy.get('[data-testid="delivery-date-selector"] > button')
      .eq(0)
      .should('have.class', 'selected');

    cy.get('[data-testid="delivery-time-selector"] > button').eq(0).click();
    cy.get('[data-testid="delivery-time-selector"] > button')
      .eq(0)
      .should('have.class', 'selected');

    cy.get('[data-testid="delivery-selector-next-button"]').should('not.be.disabled');
    cy.get('[data-testid="delivery-selector-next-button"]').click();

    cy.get('h1').contains('Delivery Summary');
    cy.get('[data-testid="delivery-summary-text"]').should(
      'contain',
      'You have selected 2023-03-01 at 10:00-12:00 for delivery.'
    );
    cy.get('[data-testid="delivery-summary-confirm-button"]').click();

  });

  it('should be able to go back and edit their choice from the confirmation/summary page.', () => {
    cy.get('[data-testid="delivery-date-selector"] > button').eq(0).click();
    cy.get('[data-testid="delivery-time-selector"] > button').eq(0).click();
    cy.get('[data-testid="delivery-selector-next-button"]').click();
    cy.get('[data-testid="delivery-summary-text"]').should(
      'contain',
      'You have selected 2023-03-01 at 10:00-12:00 for delivery.'
    );

    cy.get('[data-testid="delivery-summary-back-button"]').click();
    
    cy.get('[data-testid="in-home-delivery-checkbox"]').click();
    cy.get('[data-testid="delivery-date-selector"] > button').eq(2).click();
    cy.get('[data-testid="delivery-time-selector"] > button').eq(1).click();
    cy.get('[data-testid="delivery-selector-next-button"]').click();
    cy.get('[data-testid="delivery-summary-text"]').should(
      'contain',
      'You have selected 2023-03-03 at 13:00-15:00 for in-home delivery.'
    );
    cy.get('[data-testid="delivery-summary-confirm-button"]').click();
  });
});
