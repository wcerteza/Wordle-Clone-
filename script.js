let randomWord
let secretWord
const guesses = []
let currentGuess = []
let currentLetter = 1
let gameOver = false

const fetchrandomWord = async () => {
  const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5'
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiWhatever
    }
  }
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    console.log(result.word)
    randomWord = result.word.toUpperCase()
    secretWord = randomWord.split('')
  } catch (error) {}
}

const messageEl = document.getElementById('message-el')
const gameBoard = document.getElementById('game')
const squares = document.querySelectorAll('.square')
const replayBtn = document.getElementById('play-again')

const createGameBoard = () => {
  gameBoard.innerHTML = ''
  for (let i = 0; i < 30; i++) {
    const gameSquare = document.createElement('div')
    gameSquare.classList.add('square')
    gameSquare.setAttribute('id', i + 1)
    gameBoard.appendChild(gameSquare)
  }
}

const playAgain = () => {
  fetchrandomWord()
  guesses.length = 0
  currentGuess.length = 0
  currentLetter = 1
  gameOver = false
  messageEl.innerText = ''
  replayBtn.style.backgroundColor = 'black'

  squares.forEach((square) => {
    square.style.backgroundColor = ''
    square.style.borderColor = ''
    square.textContent = ''
  })
  createGameBoard()
}

replayBtn.addEventListener('click', playAgain)

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
    if (gameOver !== true) {
      let i = 0
      const interval = setInterval(() => {
        if (i < userGuess.length) {
          const currentDiv = document.getElementById(currentRow * 5 + i + 1)
          if (guessState[i] === 'correct') {
            currentDiv.style.backgroundColor = '#6ca965'
            currentDiv.style.borderColor = '#6ca965'
            currentDiv.classList.add('animate__animated', 'animate__flipInX')
          } else if (guessState[i] === 'included') {
            currentDiv.style.backgroundColor = '#c8b653'
            currentDiv.style.borderColor = '#c8b653'
            currentDiv.classList.add('animate__animated', 'animate__flipInX')
          } else {
            currentDiv.style.backgroundColor = '#787c7f'
            currentDiv.style.borderColor = '#787c7f'
            currentDiv.classList.add('animate__animated', 'animate__flipInX')
          }
          i++
        } else {
          clearInterval(interval)
        }
      }, 300)
    }

    if (numCorrectLetters === secretWord.length) {
      messageEl.innerText = 'You Win!'
      gameOver = true
      replayBtn.style.backgroundColor = 'white'
    } else {
      currentLetter + 1
      currentGuess = []
      if (guesses.length === 6) {
        messageEl.innerText = `You lose... the correct word was ${secretWord
          .join('')
          .toUpperCase()}`
        replayBtn.style.backgroundColor = 'white'
      }
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

const keyBoard = document.querySelectorAll('[Data-Key]')
keyBoard.forEach((key) => {
  key.addEventListener('click', handleClick)
})

createGameBoard()
fetchrandomWord()
