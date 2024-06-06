import React from 'react'

import { CARDS } from '../Game.constants'

export default function useMemoryGame(nbCards: number){
    const [cards, setCards] = React.useState<GameCard[]>(() =>
        CARDS.slice(0, nbCards)
          .sort(() => Math.random() - 0.5)
          .map(item => ({ ...item, found: false, flipped: false })),
      )
    
    
      const [frozen, setFrozen] = React.useState(false)
      // TODO déduire du state
      // 💡 le nombre de paies trouvées est égal au nombre de cartes avec
      //    `found` à true, divisé par 2
      const pairsFound = cards.filter(item => item.found).length / 2
    
      React.useEffect(() => {
        const flippedCards = cards.filter(card => card.flipped && !card.found)
    
        if (flippedCards.length === 2){
          const [cardA, cardB] = flippedCards
          const cardAIndex = cards.findIndex(card => card.id === cardA.id)
          const cardBIndex = cards.findIndex(card => card.id === cardB.id)
          if (cardA.key === cardB.key){
            setCards(prevCards => {
              const newCards = [...prevCards]
              newCards[cardAIndex] = {
                ...newCards[cardAIndex],
                found: true ,
              }
              newCards[cardBIndex] = {
                ...newCards[cardBIndex],
                found: true ,
              }
              return newCards
            })
          }else{
            setFrozen(true)
    
            setTimeout(() => {
              setCards(prevCards => {
                const newCards = [...prevCards]
                newCards[cardAIndex] = {
                  ...newCards[cardAIndex],
                  flipped: false ,
                }
                newCards[cardBIndex] = {
                  ...newCards[cardBIndex],
                  flipped: false ,
                }
                return newCards
              })
              setFrozen(false)
            }, 1000)
          }
        }
      })
    
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


    return{
        cards,
        frozen,
        pairsFound,
        handleFlipCard,
        
    }
}