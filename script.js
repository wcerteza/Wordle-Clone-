const secretWord = 'EARTH'
const guesses = []
let currentGuess = []
let currentLetter = 1
let gameOver = false

const guessGrid = document.getElementById('game')
const messageEl = document.getElementById('message-el')
const gameBoard = document.getElementById('game')
const squares = document.querySelectorAll('.square')

const createGameBoard = () => {
  for (let i = 0; i < 30; i++) {
    const gameSquare = document.createElement('div')
    gameSquare.classList.add('square')
    gameSquare.setAttribute('id', i + 1)
    gameBoard.appendChild(gameSquare)
  }
}

const handleDelete = () => {
  if (!gameOver && currentGuess.length > 0) {
    currentLetter--
    currentGuess.pop()
    const previousSpace = document.getElementById(currentLetter)
    previousSpace.textContent = ''
  }
}

const handleEnter = () => {
  if (currentGuess.length === 5) {
    const userGuess = currentGuess.join('').toUpperCase()
    let numCorrectLetters = 0
    const guessState = []
    for (let i = 0; i < userGuess.length; i++) {
      if (userGuess[i] === secretWord[i]) {
        guessState.push('correct')
        numCorrectLetters++
      } else if (secretWord.includes(userGuess[i])) {
        guessState.push('included')
      } else {
        guessState.push('incorrect')
      }
    }
    guesses.push(guessState)
    const currentRow = guesses.length - 1
    for (let i = 0; i < userGuess.length; i++) {
      const currentDiv = document.getElementById(currentRow * 5 + i + 1)
      if (guessState[i] === 'correct') {
        currentDiv.style.backgroundColor = 'green'
      } else if (guessState[i] === 'included') {
        currentDiv.style.backgroundColor = 'yellow'
      } else {
        currentDiv.style.backgroundColor = 'grey'
      }
    }
    if (numCorrectLetters === secretWord.length) {
      messageEl.innerText = 'You Win!'
      gameOver = true
    } else {
      currentLetter + 1
      currentGuess = []
    }
  }
}

const handleClick = (event) => {
  const keyText = event.target.textContent
  const currentDiv = document.getElementById(currentLetter)
  if (keyText === 'Del') {
    handleDelete()
  } else if (keyText === 'Enter') {
    handleEnter()
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

createGameBoard()
