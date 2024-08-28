//const { fetchEmails } = require('../support/fetchEmails');

describe('Automate safetymojo Login', () => {
 // Cypress.config('experimentalNetworkStubbing', false);
  it('should log in using the verification code from email', () => {
    cy.visit('https://safetymojo.ai/login');
    cy.get('input[type="text"]').type('ekta.dhawan@getmojo.ai');
    cy.get('button[data-testid="FormContinueOrSigninButton"]').click();
    
    // Fetch the verification code from the Outlook email
    // cy.wrap(fetchEmails(), { timeout: 60000 }).then((verificationCode) => {
    //   cy.log('Verification code:', verificationCode); // Log the code for debugging

    //   if (verificationCode) {
    //     cy.get('input[type="text"]').type(verificationCode); // Enter the verification code
    //     cy.get('button[type="submit"]').click(); // Submit to log in
    //   } else {
    //     cy.log('No verification code found');
    //     throw new Error('Failed to retrieve verification code from email');
    //   }
    // });
  });
});


 





