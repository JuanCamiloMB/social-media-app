describe('Landing and Header Components', () => {

    before(() => {
        // Log in with valid credentials before the tests
        cy.visit('/login'); // Navigate to login page
        cy.get('input[name="username"]').type('Juan');
        cy.get('input[name="password"]').type('123456', { force: true });
        
        // Submit the form
        cy.get('form').submit();
        
        // Assert successful login
        cy.url().should('include', '/'); // Adjust as necessary
      });

    // beforeEach(() => {
    //   // Navigate to the landing page before each test
    //   cy.visit('/');
    // });
  
    it('should render the landing page components', () => {
      // Check that the main structure is visible
      cy.get('main.min-h-dvh').should('be.visible');
  
      // Check if the app-header and app-posts components are rendered
      cy.get('app-header').should('be.visible');
      cy.get('app-posts').should('be.visible');
    });
  
    it('should conditionally render the comments section based on UI interactions', () => {
      // Interact with the UI to make comments section appear
      // For example, clicking a button to show comments if there is one, or checking its existence based on the app's flow
      cy.get('app-comments').should('exist');
    });
  
    describe('Header Component', () => {
      it('should open the notifications modal when clicking on the notifications button', () => {
        // Click the notifications button
        cy.contains('Notificaciones').click();
  
        // Check if the app-notifications modal is opened
        cy.get('app-modal').should('be.visible');
        cy.get('app-notifications').should('be.visible');
      });
  
      it('should open the search modal when clicking the search icon', () => {
        // Click the search icon
        cy.get('svg[aria-labelledby="search"]').click();
  
        // Check if the search modal is opened
        cy.get('app-modal').should('be.visible');
        cy.get('input[placeholder="Search..."]').should('be.visible');
      });
  
      it('should search and display users in the search modal', () => {
        // Click the search icon
        cy.get('svg[aria-labelledby="search"]').click();
  
        // Type into the search input
        cy.get('input[placeholder="Search..."]').type('testuser');
  
        // Assuming the app fetches and displays users dynamically, check for user cards
        cy.get('div.cursor-pointer').should('have.length.at.least', 1); // Ensure at least one user is displayed
      });
  
      it('should navigate to profile when clicking on the profile image or name', () => {
        // Click the profile image or username
        cy.get('img[routerlink="/profile"]').click();
  
        // Check if the URL includes "/profile"
        cy.url().should('include', '/profile');
      });
  
      it('should log out when clicking the log out button', () => {
        // Click the log out button
        cy.get('button').contains('svg.icon-tabler-logout').click();
  
        // Simulate logging out by checking if redirected to the login page
        cy.url().should('include', '/login');
      });
    });
  });
  