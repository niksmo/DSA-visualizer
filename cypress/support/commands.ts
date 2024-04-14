// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
	namespace Cypress {
		interface Chainable {
			login(email: string, password: string): Chainable<void>;
			matchClass(
				regExp: RegExp,
				options?: Partial<TypeOptions>
			): Chainable<Element>;
		}
	}
}

Cypress.Commands.add('matchClass', { prevSubject: true }, (subject, regExp) => {
	cy
		.wrap(subject)
		.then(($el) => cy.wrap($el[0].className).should('match', regExp));
});
export {};
