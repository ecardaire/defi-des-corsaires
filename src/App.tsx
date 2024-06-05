import React from 'react'
import Home from 'pages/home'
import Game from 'pages/game'

export default function App() {
  const [username, setUsername] = React.useState("")
  const [difficulty, setDIfficulty] = React.useState<Difficulty>("medium")
  const [gameStarted, setGameStarted] = React.useState(false)

  function handleGameStarted(){
    setGameStarted(true)
  }

  if (gameStarted){
    return <Game/>
  }

  return <Home 
    username={username}
    difficulty={difficulty}
    onUsernameChange={setUsername}
    onDifficultyChange={setDIfficulty}
    onGameStarted={handleGameStarted}
  />
}
