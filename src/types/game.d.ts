type Card = {
  id: string
  key: string
  img: string
}

type GameCard = Card & {
  found: boolean
  flipped: boolean
}

type Difficulty = 'easy' | 'medium' | 'hard'
