// https://docs.cypress.io/api/introduction/api.html

describe('Home with two lists', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })
  it('Visits the app root url which contains the main and secondary list, main list should be filled', () => {
    cy.get('.header').should('be.visible')
    cy.get('.list').should('be.visible')
    cy.contains('.list', 'Main list')
  })
  it('Visits the app root url which contains the main and secondary list, second list should be without contacts', () => {
    cy.get('.main > :nth-child(2)').contains('Secondary list')
  })
  it('Main list should sort by first name', () => {
    cy.get(':nth-child(1) > .list__items > .list__sort > :nth-child(2)').click()
    cy.get(':nth-child(2) > .item > .item__data > :nth-child(1) > strong').should('be', 'Abraham')
  })
  it('Main list should sort by last name', () => {
    cy.get(':nth-child(1) > .list__items > .list__sort > :nth-child(3)').click()
    cy.get(':nth-child(2) > .item > .item__data > :nth-child(2) > strong').should('be', 'Abbey')
  })
  it('Main list should sort by email', () => {
    cy.get(':nth-child(1) > .list__items > .list__sort > :nth-child(4)').click()
    cy.get(':nth-child(2) > .item > .item__data > :nth-child(3) > strong').should('be', 'aavrahamoff1i@biblegateway.com')
  })
  it('A new contact can be added to the main list', () => {
    cy.get(':nth-child(1) > button[data-v-264bddce=""] > .list__add-user').click()
    cy.get('.modal__title').should('exist').contains('Add Contact')
    cy.get('[placeholder="First Name"]').type('Laura')
    cy.get('[placeholder="Last Name"]').type('Pérez')
    cy.get('[placeholder="Email"]').type('lperez@yuki.com')
    cy.get('[value="Female"]').click()
    cy.get('[type="submit"]').click()
    cy.get('.modal__title').should('not.exist')
    cy.get('.item__data').contains('lperez@yuki.com')
  })
  it('Should be all inputs filled to get a new contact', () => {
    cy.get(':nth-child(1) > button[data-v-264bddce=""] > .list__add-user').click()
    cy.get('[type="submit"]').click()
    cy.get('.modal__title').should('exist').contains('Add Contact')
    cy.get('[placeholder="First Name"]').type('Laura')
    cy.get('[type="submit"]').click()
    cy.get('.modal__title').should('exist').contains('Add Contact')
    cy.get('[placeholder="Last Name"]').type('Pérez')
    cy.get('[type="submit"]').click()
    cy.get('.modal__title').should('exist').contains('Add Contact')
    cy.get('[placeholder="Email"]').type('lperez@yuki.com')
    cy.get('[type="submit"]').click()
    cy.get('.modal__title').should('exist').contains('Add Contact')
    cy.get('[value="Female"]').click()
    cy.get('[type="submit"]').click()
    cy.get('.modal__title').should('not.exist')
  })
  it('A contact from main list can be deleted', () => {
    cy.get(':nth-child(2) > .item > .item__buttons > :nth-child(2)').click()
    cy.get('.item__data').should('not.contain', 'mbagniuk0@pbs.org')
  })
  it('A contact from main list can be edited', () => {
    cy.get(':nth-child(2) > .item > .item__buttons > :nth-child(1)').click()
    cy.get('[placeholder="First Name"]').clear().type('Alejandro')
    cy.get('.modal__button').click()
    cy.get(':nth-child(2) > .item > .item__data > :nth-child(1) > strong').contains('Alejandro')
  })
  it('We can delete a contact from main and put it on secondary list', () => {
    cy.get(':nth-child(2) > .item > .item__buttons > :nth-child(3)').click()
    //check that it is deleted from main
    cy.get(':nth-child(1) > .list__items > :nth-child(2) > .item > .item__data > :nth-child(3) > strong').should('not.contain', 'mbagniuk0@pbs.org')
    //check that it is added to secondary list
    cy.get(':nth-child(2) > .list__items > .list__item > .item').contains('mbagniuk0@pbs.org')
  })
  it('Search a contact from main list by first name', () => {
    cy.get(':nth-child(1) > [data-v-7cb41050=""][data-v-264bddce=""] > input').type('mathew')
    cy.get(':nth-child(1) > [data-v-7cb41050=""][data-v-264bddce=""] > button > .svg-inline--fa').click()
    cy.get(':nth-child(3) > .list__item > .item').should('exist').contains('Mathew')
  })
  it('get a feedback when there are not results for a search', () => {
    cy.get(':nth-child(1) > [data-v-7cb41050=""][data-v-264bddce=""] > input').type('r2d2')
    cy.get(':nth-child(1) > [data-v-7cb41050=""][data-v-264bddce=""] > button > .svg-inline--fa').click()
    cy.get('.list__result').should('exist').contains("there aren't results for this name")
})
})