describe('application is available', () => {
	it('should be available on localhost:3000', () => {
		cy.visit('/');
		cy.get('main').should('exist');
	});
});

export {};
