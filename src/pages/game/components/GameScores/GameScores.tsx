import React from 'react'
import clsx from 'clsx'

import Clock from 'assets/icons/Clock'
import Link from 'assets/icons/Link'
import Refresh from 'assets/icons/Refresh'

import Button from 'components/Button'
import { formatSeconds } from 'utils/time'

type Props = {
  totalPairs: number
  pairsFound: number
  timeLeft: number
  onRestart: () => void
}

export default function GameScores({
  totalPairs,
  pairsFound,
  timeLeft,
  onRestart,
}: Props) {
  const gameIsOver = pairsFound === totalPairs || timeLeft === 0
  if (!gameIsOver) return null

  const hasWon = pairsFound === totalPairs && timeLeft > 0

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-black/90">
      <h2 className="text-6xl font-bangers text-white">
        {hasWon ? 'Victory !!' : 'Game Over'}
      </h2>
      <div className="flex flex-col w-full max-w-sm gap-3 text-2xl font-bangers text-white">
        <ScoreRow icon={<Link />} title="Paires trouvées">
          {pairsFound} / {totalPairs}
        </ScoreRow>
        <ScoreRow icon={<Clock />} title="Temps restant">
          <span className={clsx(timeLeft === 0 && 'text-red-600')}>
            {formatSeconds(timeLeft)}
          </span>
        </ScoreRow>
      </div>
      <Button size="small" icon={<Refresh />} onClick={onRestart}>
        Rejouer
      </Button>
      <a href="/" className="font-medium text-yellow-400">
        Accueil
      </a>
    </div>
  )
}

type ScoreRowProps = {
  icon?: React.ReactElement
  title: React.ReactNode
  children: React.ReactNode
}

function ScoreRow({ icon, title, children: score }: ScoreRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon && React.cloneElement(icon, { className: 'w-6 h-auto' })}
        <span>{title}</span>
      </div>
      {score}
    </div>
  )
}
