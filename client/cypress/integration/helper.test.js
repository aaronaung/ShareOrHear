//Helper test class
export class TestHelper{
    constructor(){}
    testRequired(tag) {
        cy.get("#"+tag).should('have.class', 'ng-invalid', 'ng-untouched'); //should be invalid and untouched in the beginning 
        cy.get("#"+tag).type("test test").should('have.class', 'ng-valid', 'ng-touched');
        cy.get("#"+tag).clear().should("have.class", 'ng-invalid','ng-touched');
        cy.get("."+tag+ "Err").should("not.be.hidden")
    }
}