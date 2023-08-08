import {mockRequests} from './mock'

context('Примеры использования базовых методов и команд', function () {

    beforeEach(function () {
        mockRequests()
        cy.intercept('GET', '**/branding', {fixture: 'automationinTesting/branding.json'}).as('branding')
        cy.intercept('GET', '**/room', {fixture: 'automationinTesting/room.json'}).as('room')
        cy.intercept('POST', '**/message', {statusCode: 201, fixture: 'automationinTesting/message.json'}).as('message')
        cy.intercept('GET', '**/1').as('UnavailableDate')
        cy.visit('/')

    })

    function fillForm() {
            cy.get('[data-testid="ContactName"]').type('Petr Ivanov')
            cy.get('[data-testid="ContactEmail"]').type('olja-0801@mail.ru')
            cy.get('[data-testid="ContactPhone"]').type('89833337878')
            cy.get('[data-testid="ContactSubject"]').type('room')
            cy.get('[data-testid="ContactDescription"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
        }

    //основные методы
    it('visitAndUrl', () => {
        cy.visit('/')
        cy.url()//Получить URL-адрес активной страницы.

    })


    //message исправлен: сначала нужно заполнить обязательные поля в форме (все), затем ожидать message (т.к. метод POST)
    it('wait', () => {
        //cy.wait(3000)
        cy.wait('@room')

        fillForm()
        cy.contains('Submit').click()
        cy.wait('@message')
    })


    //visit, wait, get, type, clear, click, contains, url
    it('getTypeClearContainsClick', () => {
        cy.get('[data-testid="ContactName"]').type('Anna')
        cy.get('[data-testid="ContactName"]').type('{end}{backspace}')//использование опций при вызове медода
        cy.get('[data-testid="ContactName"]').clear().type('1')//можно вызывать несколько методов подряд
        cy.contains('Submit').click()

    })


    //Команды
    it('focusAndBlur', () => {
        cy.contains('Submit').focus()
        cy.contains('Submit').blur()

    })

    //Опции
    it('optionsForMetod', () => {
        cy.get('[data-testid="ContactName"]').type('{end}{backspace}')//использование опций при вызове метода

    })

})