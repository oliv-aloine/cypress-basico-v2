//Aula 7 Exercício extra 2 e Aula 11 lodash
Cypress._.times(5, function () {
    it('testa a página da política de privacidade de forma independente', () => {

        cy.visit('./src/privacy.html');
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
        cy.contains('Talking About Testing').should('be.visible');

    })
})