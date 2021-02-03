// https://docs.cypress.io/api/introduction/api.html

describe('Secondary list', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/')
    })
    it('Visits the app root url which contains the main and secondary list, main list should be filled', () => {
      cy.get('.header').should('be.visible')
      cy.get('.list').should('be.visible')
      cy.contains('.list', 'Secondary list')
    })
    it('A new contact can be added to the secondary list', () => {
        cy.get(':nth-child(2) > button[data-v-264bddce=""] > .list__add-user').click()
        cy.get('.modal__title').should('exist').contains('Add Contact')
        cy.get('[placeholder="First Name"]').type('Leia')
        cy.get('[placeholder="Last Name"]').type('Organa')
        cy.get('[placeholder="Email"]').type('lorgana@yuki.com')
        cy.get('[value="Female"]').click()
        cy.get('[type="submit"]').click()
        cy.get('.modal__title').should('not.exist')
        cy.get('.item__data').contains('lorgana@yuki.com')
      })
  })

describe('Secondary list with contacts', () => {
    before(() => {
        cy.visit('http://localhost:8080/')
        cy.get(':nth-child(2) > button[data-v-264bddce=""] > .list__add-user').click()
        cy.get('[placeholder="First Name"]').type('Luke')
        cy.get('[placeholder="Last Name"]').type('Skywalker')
        cy.get('[placeholder="Email"]').type('lskywalker@yuki.com')
        cy.get('[value="Male"]').click()
        cy.get('[type="submit"]').click()
    
        cy.get(':nth-child(2) > button[data-v-264bddce=""] > .list__add-user').click()
        cy.get('[placeholder="First Name"]').type('Han')
        cy.get('[placeholder="Last Name"]').type('Solo')
        cy.get('[placeholder="Email"]').type('hsolo@yuki.com')
        cy.get('[value="Male"]').click()
        cy.get('[type="submit"]').click()
    
        cy.get(':nth-child(2) > button[data-v-264bddce=""] > .list__add-user').click()
        cy.get('[placeholder="First Name"]').type('Darth')
        cy.get('[placeholder="Last Name"]').type('Vader')
        cy.get('[placeholder="Email"]').type('dvader@yuki.com')
        cy.get('[value="Male"]').click()
        cy.get('[type="submit"]').click()

        cy.get(':nth-child(2) > button[data-v-264bddce=""] > .list__add-user').click()
        cy.get('[placeholder="First Name"]').type('Leia')
        cy.get('[placeholder="Last Name"]').type('Organa')
        cy.get('[placeholder="Email"]').type('lorgana@yuki.com')
        cy.get('[value="Female"]').click()
        cy.get('[type="submit"]').click()
    })
    it('Should sort by first name', () => {
        cy.get(':nth-child(2) > .list__items > .list__sort > :nth-child(2)').click()
        cy.get(':nth-child(2) > .item > .item__data > :nth-child(1) > strong').should('be', 'Darth')
    })
    it('Should sort by last name', () => {
        cy.get(':nth-child(2) > .list__items > .list__sort > :nth-child(3)').click()
        cy.get(':nth-child(2) > .item > .item__data > :nth-child(2) > strong').should('be', 'Organa')
    })
    it('Should sort by email', () => {
        cy.get(':nth-child(2) > .list__items > .list__sort > :nth-child(4)').click()
        cy.get(':nth-child(2) > .item > .item__data > :nth-child(2) > strong').should('be', 'dvader@yuki.com')
    })
    it('A contact can be deleted', () => {
        cy.get(':nth-child(2) > .list__items > :nth-child(2) > .item > .item__buttons > :nth-child(2)').click()
        cy.get('.item__data').should('not.contain', 'dvader@yuki.com')
    })
    it('A contact can be edited', () => {
        cy.get(':nth-child(2) > .list__items > :nth-child(4) > .item > .item__buttons > :nth-child(1)').click()
        cy.get('[placeholder="First Name"]').clear().type('Yoda')
        cy.get('[placeholder="Last Name"]').clear().type('Wars')
        cy.get('[placeholder="Email"]').clear().type('ywars@yuki.com')
        cy.get('.modal__button').click()
        cy.get('.item').contains('Yoda')
    })
    it('change a contact from secondary list to main list', () => {
        cy.get(':nth-child(2) > .list__items > :nth-child(2) > .item > .item__buttons > :nth-child(3)').click()
        //check that it is deleted from secondary
        cy.get(':nth-child(2) > .list__items > :nth-child(2) > .item > .item__data > :nth-child(3) > strong').should('not.contain', 'hsolo@yuki.com')
        //check that it is added to main list
        cy.get(':nth-child(1) > .list__items > .list__item > .item').contains('hsolo@yuki.com')
    })
    it('Search a contact by first name', () => {
        cy.get(':nth-child(2) > [data-v-7cb41050=""][data-v-264bddce=""] > input').type('yoda')
        cy.get(':nth-child(2) > [data-v-7cb41050=""][data-v-264bddce=""] > button > .svg-inline--fa').click()
        cy.get(':nth-child(3) > .list__item > .item').should('exist').contains('Yoda')
    })
    it('get a feedback when there are not results for a search', () => {
        cy.get(':nth-child(2) > [data-v-7cb41050=""][data-v-264bddce=""] > input').type('r2d2')
        cy.get(':nth-child(2) > [data-v-7cb41050=""][data-v-264bddce=""] > button > .svg-inline--fa').click()
        cy.get('.list__result').should('exist').contains("there aren't results for this name")
    })
})