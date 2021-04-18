
describe('Form Tests', function () {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  // GET NAME INPUT
  const nameInput = () => cy.get('input[name=username]')
  it('should get the username input and type a name in it', () => {
    nameInput()
      .should('have.value', '')
      .type('mikelovelace')
      .should('have.value', 'mikelovelace') // Use an assertion to check if the username input contains the name you provided
  })

  // GET PASSWORD INPUT
  const passwordInput = () => cy.get('input[name=password]')
  it('should get the password input and type a password in it', () => {
    passwordInput()
      .should('have.value', '')
      .type('abc123')
      .should('have.value', 'abc123')    
  })


  // GET EMAIL INPUT
  const emailInput = () => cy.get('input[name=email]')
  it('should get the email input and type an email address in it', () => {
    emailInput()
      .should('have.value', '')
      .type('mike@mlovelace.net')
      .should('have.value', 'mike@mlovelace.net') // Use an assertion to check if the email input contains the email you provided
  })

  // SELECT A ROLE
  const roleMenu = () => cy.get('select')
  it('should test to see if the user selected a role', () => {
    roleMenu()
      .select('fe')
      .should('have.value', 'fe') // Use an assertion to check if a role was selected
  })


  // SELECT A GENDER
  const genderCheck = () => cy.get('[type="radio"]')
  it('should check to see if user selected a gender', () => {
    genderCheck()
      .first()
      .check()
  })


  // CHECK TERMS OF SERVICE BOX
  const termsBox = () => cy.get('input[name=tos]')
  it('Set up a test that will check to see if a user can check the terms of service box', () => {
    termsBox()
      .check()
      .should('be.checked')
  })

  const submitForm = () => cy.get('#btn')
  it('Test to see if the submit button works', () => {
    nameInput()
    .type('mikelovelace')
    .should('have.value', 'mikelovelace')
    .clear()

    .passwordInput()
    .type('abc123abc')
    .should('have.value', 'abc123abc')
    .clear()

    .emailInput()
    .type('mike@mlovelace.net')
    .should('have.value', 'mike@mlovelace.net')
    .clear()

    .roleMenu()
    .select('fe')
    .should('have.value', 'fe')
    .clear()

    .genderCheck()
    .first()
    .check()
    .clear()

    .tersmBox()
    .check()
    .uncheck()


  })

})