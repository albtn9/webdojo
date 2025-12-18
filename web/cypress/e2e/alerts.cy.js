describe('Validação de Alerts em Javascript', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })
    it('deve validar a mensagem de alerta ', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })
        cy.log('todo')
        cy.contains('button', 'Mostrar Alert').click()
    })
    it('deve confirmar um dialogo e confirmar a mensagem  positiva ', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true
        })
         cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
            return true
        })
        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('deve cancelar um dialogo e confirmar a mensagem  negativa ', () => {
         cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false //click no cancelar
        })
         cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
            return true
        })
        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('deve interagir com um prompt, inserir um texto e validar uma mensagem ', () => {
        cy.window().then((win) =>{
            cy.stub(win, 'prompt').returns('Gu$ta')
        })
         cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Gu$ta! Boas-vindas ao WebDojo!')
        })
        cy.contains('button','Mostrar Prompt').click()
    })
})