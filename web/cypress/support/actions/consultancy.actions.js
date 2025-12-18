Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('#name').type(form.name)
    cy.get('#email').type(form.email)
    cy.get('#phone').type(form.phone)//.should('have.value', '(11) 9999-1000')

    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)

    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')
        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
    }



    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type("Lorem Ipsum is simply dummy text of the printing and typesetting industry.")


    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })
    cy.contains('label', 'termos de uso')
        .find('input')
        .check()

})

Cypress.Commands.add('validadeConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})

Cypress.Commands.add('submitConsultancyForm', () =>{
    cy.contains('label', 'termos de uso')
            .find('input')
            //.check()
        cy.contains('button', 'Enviar formulário')
            .click()
})