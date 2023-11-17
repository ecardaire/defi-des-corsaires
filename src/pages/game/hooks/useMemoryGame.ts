import React from 'react'
import { CARDS } from '../Game.constants'

export default function useMemoryGame(nbCards: number) {
  const [cards, setCards] = React.useState<GameCard[]>(() =>
    CARDS.slice(0, nbCards)
      .sort(() => Math.random() - 0.5)
      .map(item => ({ ...item, found: false, flipped: false })),
  )
  const pairsFound = cards.filter(item => item.found).length / 2

  const [frozen, setFrozen] = React.useState(false)

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

  return {
    cards,
    pairsFound,
    frozen,
    handleFlipCard,
  }
}
