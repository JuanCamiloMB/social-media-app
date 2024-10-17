// cypress/e2e/login.spec.ts

describe('Login Form', () => {
    beforeEach(() => {
      // Navigate to the login page before each test
      cy.visit('/login');
    });
  
    it('should display the login form', () => {
      // Check if form elements are visible
      cy.get('form').should('be.visible');
      cy.get('h1').contains('Log in').should('be.visible');
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').contains('Ingresar').should('be.visible');
    });
  
    it('should not submit with empty fields', () => {
      // Click the login button without entering credentials
      cy.get('button[type="submit"]').click();
  
      // Assert that an error message is shown (or form not submitted)
      cy.get('form').then($form => {
        expect($form[0].checkValidity()).to.be.false;
      });
    });
  
    it('should log in with valid credentials', () => {
      // Type valid credentials
      cy.get('input[name="username"]').type('Juan');
      cy.get('input[name="password"]').type('123456', {force:true});
  
      // Submit the form
      cy.get('form').submit();
  
      // Assert successful login
      cy.url().should('include', '/');
    });
  
    it('should toggle password visibility', () => {
      // Check that the password field initially has type 'password'
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  
      // Click the toggle password button
      cy.get('button[type="button"]').click();
  
      // Check that the password field now has type 'text'
      cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    });
  
    it('should navigate to the register page', () => {
      // Click the "No tienes una cuenta? Registrate" link
      cy.get('a[routerLink="/register"]').click();
  
      // Assert that the URL includes '/register'
      cy.url().should('include', '/register');
    });
  });
  