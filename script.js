class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.czysc()
    }
  
    czysc() {
      this.aktualneDzialanie = ''
      this.poprzednieDzialanie = ''
      this.operacja = undefined
    }
  
    delete() {
      this.aktualneDzialanie = this.aktualneDzialanie.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.aktualneDzialanie.includes('.')) return
      this.aktualneDzialanie = this.aktualneDzialanie.toString() + number.toString()
    }
  
      plusblagamniechzadziala(number) {
          this.aktualneDzialanie = this.aktualneDzialanie+1
      }
  
      minusblagamniechzadziala(number) {
          this.aktualneDzialanie = this.aktualneDzialanie - 1
      }
  
  
    chooseOperation(operation) {
      if (this.aktualneDzialanie === '') return
      if (this.poprzednieDzialanie !== '') {
        this.compute()
      }
      this.operacja = operation
      this.poprzednieDzialanie = this.aktualneDzialanie
      this.aktualneDzialanie = ''
    }
  
    compute() {
      let obliczenia
      const poprzednia = parseFloat(this.poprzednieDzialanie)
      const aktualna = parseFloat(this.aktualneDzialanie)
      if (isNaN(poprzednia) || isNaN(aktualna)) return
      switch (this.operacja) {
        case '+':
          obliczenia = poprzednia + aktualna
          break
        case '-':
          obliczenia = poprzednia - aktualna
          break
        case '*':
          obliczenia = poprzednia * aktualna
          break
        case '/':
          obliczenia = poprzednia / aktualna
              break
        default:
          return
      }
      this.aktualneDzialanie = obliczenia
      this.operacja = undefined
      this.poprzednieDzialanie = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.aktualneDzialanie)
      if (this.operacja != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.poprzednieDzialanie)} ${this.operacja}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const przyciskPlusJeden = document.querySelectorAll('[data-plus]')
  const przyciskMinusJeden = document.querySelectorAll('[data-minus]')
  
  const przyciskLiczby = document.querySelectorAll('[data-number]')
  const przyciskDzialania = document.querySelectorAll('[data-operation]')
  const wynik = document.querySelector('[data-equals]')
  const przyciskusuwania = document.querySelector('[data-delete]')
  const czyszczenie = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[danePoprzedniejOperacji]')
  const currentOperandTextElement = document.querySelector('[daneAktualnejOperacji]')
  
  const kalkulator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  
  przyciskPlusJeden.forEach(button => {
      button.addEventListener('click', () => {
          kalkulator.plusblagamniechzadziala(button.innerText)
          kalkulator.updateDisplay()
      })
  })
  
  przyciskMinusJeden.forEach(button => {
      button.addEventListener('click', () => {
          kalkulator.minusblagamniechzadziala(button.innerText)
          kalkulator.updateDisplay()
      })
  })
  
  przyciskLiczby.forEach(button => {
    button.addEventListener('click', () => {
      kalkulator.appendNumber(button.innerText)
      kalkulator.updateDisplay()
    })
  })
  
  przyciskDzialania.forEach(button => {
    button.addEventListener('click', () => {
      kalkulator.chooseOperation(button.innerText)
      kalkulator.updateDisplay()
    })
  })
  
  wynik.addEventListener('click', button => {
    kalkulator.compute()
    kalkulator.updateDisplay()
  })
  
  czyszczenie.addEventListener('click', button => {
    kalkulator.czysc()
    kalkulator.updateDisplay()
  })
  
  przyciskusuwania.addEventListener('click', button => {
    kalkulator.delete()
    kalkulator.updateDisplay()
  })
  