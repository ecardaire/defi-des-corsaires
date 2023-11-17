import React from 'react'
import clsx from 'clsx'

import treasureImg from 'assets/treasure.png'
import Play from 'assets/icons/Play'
import { DIFFICULTIES } from 'pages/game/Game.constants'
import Button from 'components/Button'
import Difficulty from './components/Difficulty'

type Props = {
  username: string
  onUsernameChange: (username: string) => void
  difficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  onStartGame: () => void
}

export default function Home({
  username,
  onUsernameChange,
  difficulty,
  onDifficultyChange,
  onStartGame,
}: Props) {
  const usernameId = React.useId()
  const difficultyLabelId = React.useId()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onStartGame()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 items-center justify-center h-full"
    >
      <div>
        <img src={treasureImg} alt="Treasure" className="w-64 h-auto mx-auto" />
        <h1 className="text-5xl font-bangers text-white">
          Le défi des corsaires
        </h1>
      </div>
      <div>
        <label
          htmlFor={usernameId}
          className="text-lg leading-6 font-semibold text-white text-center w-full block"
        >
          Entrez votre pseudo
        </label>
        <div className="relative mt-2">
          <input
            id={usernameId}
            type="text"
            name="username"
            value={username}
            onChange={e => onUsernameChange(e.target.value)}
            className={clsx(
              'peer block w-full min-w-[320px] border-0 bg-transparent py-2 px-3',
              'placeholder::text-gray-300 text-white',
              'focus:ring-0 focus-visible:ring-0 focus-visible:outline-0',
            )}
            placeholder="Capitaine Crochet"
            autoComplete="off"
          />
          <div
            className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-purple-600"
            aria-hidden="true"
          />
        </div>
      </div>
      <div>
        <label
          id={difficultyLabelId}
          className="text-lg leading-6 font-semibold text-white text-center w-full block"
        >
          Choisissez une difficulté
        </label>
        <div>
          <div
            role="radiogroup"
            aria-labelledby={difficultyLabelId}
            className="mt-2 flex gap-2"
          >
            {Object.entries(DIFFICULTIES).map(([key, conf]) => (
              <Difficulty
                key={key}
                checked={difficulty === key}
                onCheck={() => onDifficultyChange(key as Difficulty)}
                label={conf.label}
                minutes={Math.floor(conf.time / 60)}
                cards={conf.rows * conf.cols}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        disabled={username.trim().length === 0}
        type="submit"
        size="large"
        icon={<Play />}
      >
        Jouer
      </Button>
    </form>
  )
}
