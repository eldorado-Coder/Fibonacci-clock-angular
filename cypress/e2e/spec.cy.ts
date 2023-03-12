describe('e2e test', () => {
  beforeEach('visit dashboard', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('hours', new Date().getHours().toString())
        win.localStorage.setItem('minutes', new Date().getMinutes().toString())
      },
    });
  })
  
  
  describe('it should have buttons', () => {
    it('should have previous button', () => {
      cy.get('#previous').then(previous => {
        expect(previous.text()).to.contains("Previous")
      })
    })
    
    it('should have Next button', () => {
      cy.get('#next').then(next => {
        expect(next.text()).to.contains("Next")
      })
    })
  })

  describe('it should update localStorage', () => {
    it('click previous button should update localStorage', () => {
      cy.get('#previous').click()
      cy.get('#hours').invoke('val').then(hours => {
        expect(localStorage.getItem('hours')).to.eq(hours)
      })
      cy.get('#minutes').invoke('val').then(minutes => {
        expect(localStorage.getItem('minutes')).to.eq(minutes)
      })
    })

    it('click next button should update localStorage', () => {
      cy.get('#next').click()
      cy.get('#hours').invoke('val').then(hours => {
        expect(localStorage.getItem('hours')).to.eq(hours)
      })
      cy.get('#minutes').invoke('val').then(minutes => {
        expect(localStorage.getItem('minutes')).to.eq(minutes)
      })
    })
  })
  


})