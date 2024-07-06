const calculator = () => {
  let calculatorDisplayValue = ''
  const signsRegExp = ['x', '.', '+', '-', '/']
  const validSignsRegExp = /[0-9\.()x\/\+\-]/gi

  const calculatorDisplay = document.getElementById('calculator-display')
  const numButtons = document.querySelectorAll('.num-btn')
  const signButtons = document.querySelectorAll('.sign-btn')
  const dotBtn = document.getElementById('dot-btn')
  const cancelBtn = document.getElementById('cancel-btn')
  const equalBtn = document.getElementById('equal-btn')
  const negateBtn = document.getElementById('negate-btn')

  const keyUpHandler = (e) => {
    e.preventDefault()
    if (validSignsRegExp.test(e.key)) calculatorDisplayValue += e.key
    if (e.key === 'Backspace') calculatorDisplayValue = calculatorDisplayValue.slice(0, -1)
    if (e.key === 'Escape') cancelHandler()
    calculatorDisplay.value = calculatorDisplayValue
  }

  const clickNumButtonsHandler = (button) => {
    calculatorDisplayValue += `${button.currentTarget.innerHTML}`
    calculatorDisplay.value = calculatorDisplayValue
  }

  const clickSignButtonsHandler = (button) => {
    if (calculatorDisplayValue.length > 0) {
      const lastChar = calculatorDisplayValue.charAt(calculatorDisplayValue.length - 1)

      if (signsRegExp.indexOf(lastChar) === -1) {
        const sign = button.currentTarget.innerHTML

        if (sign === '.') {
          checkDots()
        } else {
          calculatorDisplayValue += sign
        }

      }

      calculatorDisplay.value = calculatorDisplayValue
    }
  }

  const checkDots = () => {
    const nums = calculatorDisplayValue.split(/[\/x\+\-]/gi).filter(f => +f)
    const dots = calculatorDisplayValue.split(/[\d\/x\+\-]/gi).filter(f => f === '.')
    if (nums.length !== 0 && nums.length > dots.length) {
      calculatorDisplayValue += `.`
    }
  }

  const cancelHandler = () => {
    calculatorDisplayValue = ''
    calculatorDisplay.value = calculatorDisplayValue
  }

  const checkBrackets = () => {
    const leftBracketLength = calculatorDisplayValue.split('').filter(f => f === '(').length
    const rightBracketLength = calculatorDisplayValue.split('').filter(f => f === ')').length

    if (leftBracketLength > rightBracketLength) {
      const bracket = ')'.repeat(leftBracketLength - rightBracketLength)
      calculatorDisplayValue = calculatorDisplayValue + bracket
    }

    if (rightBracketLength > leftBracketLength) {
      const bracket = '('.repeat(rightBracketLength - leftBracketLength)
      calculatorDisplayValue = bracket + calculatorDisplayValue
    }
  }

  const solveExpression = () => {
    if (calculatorDisplayValue.length > 0) {
      checkBrackets()
      const value = calculatorDisplayValue
        .replaceAll('x', '*')
        .replaceAll('()', '')

      if (value) {
        const expression = BigInt(eval(value)).toString();
        if (expression.length > 21) {
          calculatorDisplayValue = ''
          calculatorDisplay.value = expression.slice(0, 21) + `10n${expression.length - 21}`
        } else {
          calculatorDisplayValue = expression
          calculatorDisplay.value = calculatorDisplayValue
        }
      } else {
        calculatorDisplayValue = ''
        calculatorDisplay.value = calculatorDisplayValue
      }
    }
  }

  numButtons.forEach(button => {
    button.addEventListener('click', clickNumButtonsHandler)
  })

  signButtons.forEach(button => {
    button.addEventListener('click', clickSignButtonsHandler)
  })

  dotBtn.addEventListener('click', checkDots)

  cancelBtn.addEventListener('click', cancelHandler)

  equalBtn.addEventListener('click', solveExpression)

  calculatorDisplay.onkeydown = (e) => e.preventDefault()
  document.addEventListener('keyup', keyUpHandler)
  calculatorDisplay.addEventListener('keyup', keyUpHandler)
}


calculator()