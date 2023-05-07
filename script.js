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
