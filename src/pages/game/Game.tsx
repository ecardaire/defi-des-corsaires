import Fire from 'assets/icons/Fire'
import logoImg from 'assets/treasure.png'
import Stop from 'assets/icons/Stop'
import Ban from 'assets/icons/Ban'
import Link from 'assets/icons/Link'

import { CARDS, DIFFICULTIES } from './Game.constants'
import TimeLeft from './components/TimeLeft'
import clsx from 'clsx'
import Button from 'components/Button'
import GameCard from './components/GameCard'

type Props = {
  difficulty: Difficulty
}

export default function Game({ difficulty }: Props) {
  const { rows, cols, label, fireIcon, time } = DIFFICULTIES[difficulty]
  const nbCards = rows * cols

  // TODO: convertir en state
  // 💡 Utiliser la fonction d'initialisation de state
  const cards: GameCard[] = CARDS.slice(0, nbCards)
    .sort(() => Math.random() - 0.5)
    .map(item => ({ ...item, found: false, flipped: false }))

  // Nous servira plus tard pour bloquer temporairement le jeu lorsque
  // le joueur à retourné deux cartes ne correspondant pas
  const frozen = false
  // Nous déduirons le nombre de paires trouvées à partir du state plus tard
  const pairsFound = 0

  return (
    <div className="flex flex-col items-center gap-4 max-h-screen pt-8">
      {/* Titre et logo */}
      <div className="flex items-center gap-6">
        <img src={logoImg} alt="Treasure" className="w-20 h-auto" />
        <h1 className="text-4xl font-bangers text-white">
          Le défi des corsaires
        </h1>
      </div>
      {/* Container */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        {/* Game header */}
        <div className="flex items-center justify-between p-2 text-2xl text-white font-bangers">
          <div className="flex items-center gap-2">
            <span>{label}</span>
            <div className="flex items-center">
              {[...Array(fireIcon)].map((_, index) => (
                <Fire key={index} className="w-8 h-auto -mr-2" />
              ))}
            </div>
          </div>
          {frozen && <Ban className="w-8 h-auto text-red-600" />}
          <TimeLeft seconds={time} />
        </div>
        {/* Game board */}
        <div
          className={clsx('w-full grid gap-2', frozen && 'pointer-events-none')}
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {cards.map((item, index) => (
            <GameCard key={index} card={item} />
          ))}
        </div>
        {/* Game Footer */}
        <div className="flex items-center justify-between p-2">
          <Button icon={<Stop />}>Abandonner</Button>
          <div className="flex items-center gap-2 text-white">
            <Link className="w-6 h-auto" />
            <span className="font-bangers text-2xl">
              {pairsFound} / {nbCards / 2} paires trouvées
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
