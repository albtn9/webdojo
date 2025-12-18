describe('Links em Nova Janela',()=>{
    it('Validando o atributo do link do instagram',()=>{
        cy.start()
        cy.submitLoginForm('papito@webdojo.com','katana123')
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr','href','https://www.instagram.com/qapapito')
            .and('have.attr','target','_blank')
    })
    it('Validando o atributo do link do instagram',()=>{
        cy.start()
        cy.submitLoginForm('papito@webdojo.com','katana123')
        cy.contains('Formulários').click()

        cy.contains('a','termos de uso')
          .invoke('removeAttr','target')
          .click()
        cy.contains('Termos de Uso')
            .should('be.visible')

    })

})