describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testaaja',
      username: 'Tester',
      password: 'Salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('Salasana')
      cy.get('#login-button').click()

      cy.contains('Testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('Wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain','wrong username or password')

      cy.get('html').should('not.contain', 'Testaaja logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'Salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('TestTitle')
      cy.get('#author').type('TestAuthor')
      cy.get('#url').type('TestUrl')
      cy.get('#blog-button').click()

      cy.contains('a new blog TestTitle by TestAuthor added')
    })
  })

  describe('blog exists', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'Salasana' })
      cy.createBlog({ title: 'Title1', author: 'Author1', url: 'Url1' })
    })

    it('it can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()

      cy.contains('likes: 2')
    })

    it('it can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'Title1 Author1')
    })
  })

})