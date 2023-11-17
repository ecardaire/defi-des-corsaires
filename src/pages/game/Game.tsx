import React from 'react'
import clsx from 'clsx'

import Fire from 'assets/icons/Fire'
import logoImg from 'assets/treasure.png'
import Stop from 'assets/icons/Stop'
import Ban from 'assets/icons/Ban'
import Link from 'assets/icons/Link'

import { CARDS, DIFFICULTIES } from './Game.constants'
import TimeLeft from './components/TimeLeft'
import Button from 'components/Button'
import GameCard from './components/GameCard'

type Props = {
  difficulty: Difficulty
  onQuitGame: () => void
}

export default function Game({ difficulty, onQuitGame }: Props) {
  const { rows, cols, label, fireIcon, time } = DIFFICULTIES[difficulty]
  const nbCards = rows * cols

  const [cards, setCards] = React.useState<GameCard[]>(() =>
    CARDS.slice(0, nbCards)
      .sort(() => Math.random() - 0.5)
      .map(item => ({ ...item, found: false, flipped: false })),
  )

  const [frozen, setFrozen] = React.useState(false)
  const pairsFound = cards.filter(item => item.found).length / 2

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout
    // On récupère les cartes retournées et non trouvées
    const flippedCards = cards.filter(item => item.flipped && !item.found)
    // Si on a retourné deux cartes, on les compare
    if (flippedCards.length === 2) {
      const [cardA, cardB] = flippedCards
      const cardAIndex = cards.findIndex(item => item.id === cardA.id)
      const cardBIndex = cards.findIndex(item => item.id === cardB.id)

      // Si les deux cartes sont identiques, on les marque comme trouvées
      if (cardA.key === cardB.key) {
        setCards(prevCards => {
          const newCards = [...prevCards]
          newCards[cardAIndex] = {
            ...newCards[cardAIndex],
            found: true,
          }
          newCards[cardBIndex] = {
            ...newCards[cardBIndex],
            found: true,
          }
          return newCards
        })
      } else {
        // Sinon, on retourne les deux cartes après un délai
        setFrozen(true)
        timeoutId = setTimeout(() => {
          setCards(prevCards => {
            const newCards = [...prevCards]
            newCards[cardAIndex] = {
              ...newCards[cardAIndex],
              flipped: false,
            }
            newCards[cardBIndex] = {
              ...newCards[cardBIndex],
              flipped: false,
            }
            return newCards
          })
          setFrozen(false)
        }, 1000)
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [cards])

  function handleFlipCard(index: number) {
    setCards(prevCards => {
      const newCards = [...prevCards]
      newCards[index] = {
        ...newCards[index],
        flipped: !newCards[index].flipped,
      }
      return newCards
    })
  }

  function handleQuitGame() {
    if (window.confirm('Voulez-vous vraiment abandonner ?')) {
      onQuitGame()
    }
  }

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
            <GameCard
              key={index}
              card={item}
              onFlip={() => handleFlipCard(index)}
            />
          ))}
        </div>
        {/* Game Footer */}
        <div className="flex items-center justify-between p-2">
          <Button icon={<Stop />} onClick={handleQuitGame}>
            Abandonner
          </Button>
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
