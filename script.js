const secretWord = 'EARTH'
let currentGuess = []
let currentLetter = 1
const guessGrid = document.getElementById('game')

const createGameBoard = () => {
  const gameBoard = document.getElementById('game')
  for (let i = 0; i < 30; i++) {
    const gameSquare = document.createElement('div')
    gameSquare.classList.add('square')
    gameSquare.setAttribute('id', i + 1)
    gameBoard.appendChild(gameSquare)
  }
}

window.onload = () => {
  createGameBoard()
}

const handleClick = (event) => {
  const keyText = event.target.textContent
  const currentDiv = document.getElementById(currentLetter)

  if (keyText === 'Del') {
    if (currentGuess.length > 0) {
      currentLetter--
      currentGuess.pop()
      const previousSpace = document.getElementById(currentLetter)
      previousSpace.textContent = ''
    }
  } else if (currentGuess.length >= 5) {
    return
  } else {
    currentDiv.textContent = keyText
    currentLetter++
    currentGuess.push(keyText)
  }
}

const keyBoard = document.querySelectorAll('button')
keyBoard.forEach((key) => {
  key.addEventListener('click', handleClick)
})
