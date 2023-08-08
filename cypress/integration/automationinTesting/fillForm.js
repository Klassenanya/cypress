import {mockRequests} from './mock'

context('Заполнение и отправка формы на странице', function () {

    beforeEach(function () {
        //mockRequests()
        cy.intercept('GET', '**/branding', {fixture: 'automationinTesting/branding.json'}).as('branding')
        cy.intercept('GET', '**/room', {fixture: 'automationinTesting/room.json'}).as('room')
        cy.intercept('POST', '**/message').as('message')
        cy.visit('/')

    })

    function fillForm() {
        cy.wait(['@branding', '@room'])
        cy.get('[data-testid="ContactName"]').type('Anna Klassen')
        cy.get('[data-testid="ContactEmail"]').type('anna@mail.ru')
        cy.get('[data-testid="ContactPhone"]').type('81234567890')
        cy.get('[data-testid="ContactSubject"]').type('Booking')
        cy.get('[data-testid="ContactDescription"]').type('Hello! My name is Anna.')
    }

    //отправка формы с проверкой параметров запроса
    it('fillFormCheckRequest', () => {
        fillForm()
        cy.contains('Submit').click()

        cy.wait('@message').should(xhr => {
            expect(xhr.request.body).have.property('description', 'Hello! My name is Anna.')
            expect(xhr.request.body).have.property('email', 'anna@mail.ru')
            expect(xhr.request.body).have.property('name', 'Anna Klassen')
            expect(xhr.request.body).have.property('phone', '81234567890')
            expect(xhr.request.body).have.property('subject', 'Booking')
        })

        cy.get('.contact').should('contain', 'Thanks for getting in touch Anna Klassen!').and('contain', 'Booking')
    })

    //отправка формы с проверкой параметров ответа
    it('fillFormCheckResponse', () => {
            fillForm()
            cy.contains('Submit').click()

            cy.wait('@message').should(xhr => {
                expect(xhr.response.body).have.property('description', 'Hello! My name is Anna.')
                expect(xhr.response.body).have.property('email', 'anna@mail.ru')
                expect(xhr.response.body).have.property('name', 'Anna Klassen')
                expect(xhr.response.body).have.property('phone', '81234567890')
                expect(xhr.response.body).have.property('subject', 'Booking')
            })

            cy.get('.contact').should('contain', 'Thanks for getting in touch Anna Klassen!').and('contain', 'Booking')
        })

})