import React from 'react'

import Home from 'pages/home'
import Game from 'pages/game'

export default function App() {
  const [username, setUsername] = React.useState('')
  const [difficulty, setDifficulty] = React.useState<Difficulty>('medium')
  const [gameStarted, setGameStarted] = React.useState(false)

  function handleStartGame() {
    setGameStarted(true)
  }

  function handleQuitGame() {
    setGameStarted(false)
  }

  const [gameKey, setGameKey] = React.useState(Date.now())
  function handleRestart() {
    setGameKey(Date.now())
  }

  if (gameStarted) {
    return (
      <Game
        key={gameKey}
        difficulty={difficulty}
        onQuitGame={handleQuitGame}
        onRestart={handleRestart}
      />
    )
  }
  return (
    <Home
      username={username}
      onUsernameChange={setUsername}
      difficulty={difficulty}
      onDifficultyChange={setDifficulty}
      onStartGame={handleStartGame}
    />
  )
}
