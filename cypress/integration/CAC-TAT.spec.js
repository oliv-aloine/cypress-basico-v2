// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    const threeSecondsInMS = 3000

    beforeEach(function () {

        // runs before each test in the block
        cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function () {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

    })

    //Aula 2 Exercício e exercício extra 1 
    it('preenche os campos obrigatórios e envia o formulário', function () {

        const longtext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus libero quis tincidunt venenatis. Nam a ultrices lectus. Duis finibus maximus ultricies. Donec eu nisi eu quam tincidunt posuere. Pellentesque ac felis auctor, sagittis sem quis, molestie tortor. Vivamus eget aliquam sapien. Curabitur sit amet est viverra, luctus enim sed, rutrum dui. Donec sollicitudin condimentum aliquet. Phasellus quis pharetra diam. Integer a dui magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisi elit, semper ut nisl vel, sollicitudin auctor diam.'

        cy.clock()

        cy.get('#firstName').type('aline')
        cy.get('#lastName').type('oliveira')
        cy.get('#email').type('aline@email.com')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(threeSecondsInMS)

        cy.get('.success').should('not.be.visible')

    })

    //Aula 2 Exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.clock()

        cy.get('#firstName').type('aline')
        cy.get('#lastName').type('oliveira')
        cy.get('#email').type('validaemail')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(threeSecondsInMS)

        cy.get('.error').should('not.be.visible')

    })

    //Aula 2 Exercício extra 3 e Aula 11
    Cypress._.times(3, function () {
        it('valida campo telefone vazio ao digitar valor não-numérico', function () {

            cy.get('#phone')
                .type('phonenumber')
                .should('have.text', '')

        })
    })

    //Aula 2 Exercício extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.clock()

        cy.get('#firstName').type('aline')
        cy.get('#lastName').type('oliveira')
        cy.get('#email').type('aline@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(threeSecondsInMS)

        cy.get('.error').should('not.be.visible')
    })

    //Aula 2 Exercício extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {

        cy.get('#firstName')
            .type('aline')
            .should('have.value', 'aline')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('oliveira')
            .should('have.value', 'oliveira')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('aline@email.com')
            .should('have.value', 'aline@email.com')
            .clear()
            .should('have.value', '')


        cy.get('#phone')
            .type('12321')
            .should('have.value', '12321')
            .clear()
            .should('have.value', '')

    })

    //Aula 2 Exercício extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(threeSecondsInMS)

        cy.get('.error').should('not.be.visible')

    })

    //Aula 2 Exercício extra 7
    it('envia o formuário com sucesso usando um comando customizado', function () {

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

        cy.tick(threeSecondsInMS)

        cy.get('.success').should('not.be.visible')

    })

    //Aula 3 Exercício
    it('seleciona um produto (YouTube) por seu texto', function () {

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    //Aula 3 Exercício extra 1
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')

    })

    //Aula 3 Exercício extra 2
    it('seleciona um produto (Blog) por seu índice', function () {

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')

    })

    //Aula 4 Exercício
    it('marca o tipo de atendimento "Feedback"', function () {

        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })

    //Aula 4 Exercício extra
    it('marca cada tipo de atendimento', function () {

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    //Aula 5 Exercício
    it('marca ambos checkboxes, depois desmarca o último', function () {

        cy.get('#check input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    //Aula 6 Exercício
    it('seleciona um arquivo da pasta fixtures', function () {

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    //Aula 6 Exercício extra 1
    it('seleciona um arquivo simulando um drag-and-drop', function () {

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    //Aula 6 Exercício extra 2
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    //Aula 7 Exercício
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {

        //<a> tem o atributo target com o valor _blank
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    //Aula 7 Exercício extra 1
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')

    })

    //Aula 11 .invoke()
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    //Aula 11 .invoke()
    it('preenche a area de texto usando o comando invoke', function () {

        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)

    })

    //Aula 11 cy.request
    it('faz uma requisição HTTP', function () {

        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })

    })

    //Desafio Aula 12
    it.only('encontre o gato', function () {

        cy.get('#cat')
            .invoke('show')
            .should('be.visible')

        cy.get('#title')
            .invoke('text', 'CAT TAT')

        cy.get('#subtitle')
            .invoke('text', '❤️ gatos')

    })

})