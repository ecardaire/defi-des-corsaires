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

  if (gameStarted) {
    return <Game difficulty={difficulty} />
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
