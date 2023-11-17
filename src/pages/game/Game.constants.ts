import anchorImg from 'assets/illustrations/anchor.png'
import canonImg from 'assets/illustrations/canon.png'
import compassImg from 'assets/illustrations/compass.png'
import flagImg from 'assets/illustrations/flag.png'
import mapImg from 'assets/illustrations/map.png'
import parrotImg from 'assets/illustrations/parrot.png'
import shipImg from 'assets/illustrations/ship.png'
import skullImg from 'assets/illustrations/skull.png'
import swordImg from 'assets/illustrations/sword.png'
import treasureImg from 'assets/illustrations/treasure.png'

export const CARDS: Card[] = [
  { id: 'anchor-1', key: 'anchor', img: anchorImg },
  { id: 'anchor-2', key: 'anchor', img: anchorImg },
  { id: 'canon-1', key: 'canon', img: canonImg },
  { id: 'canon-2', key: 'canon', img: canonImg },
  { id: 'compass-1', key: 'compass', img: compassImg },
  { id: 'compass-2', key: 'compass', img: compassImg },
  { id: 'flag-1', key: 'flag', img: flagImg },
  { id: 'flag-2', key: 'flag', img: flagImg },
  { id: 'map-1', key: 'map', img: mapImg },
  { id: 'map-2', key: 'map', img: mapImg },
  { id: 'parrot-1', key: 'parrot', img: parrotImg },
  { id: 'parrot-2', key: 'parrot', img: parrotImg },
  { id: 'ship-1', key: 'ship', img: shipImg },
  { id: 'ship-2', key: 'ship', img: shipImg },
  { id: 'skull-1', key: 'skull', img: skullImg },
  { id: 'skull-2', key: 'skull', img: skullImg },
  { id: 'sword-1', key: 'sword', img: swordImg },
  { id: 'sword-2', key: 'sword', img: swordImg },
  { id: 'treasure-1', key: 'treasure', img: treasureImg },
  { id: 'treasure-2', key: 'treasure', img: treasureImg },
]

type DifficultyConf = {
  rows: number
  cols: number
  time: number
  label: string
  fireIcon: number
}

export const DIFFICULTIES: Record<Difficulty, DifficultyConf> = {
  easy: {
    rows: 3,
    cols: 4,
    time: 60,
    label: 'Facile',
    fireIcon: 1,
  },
  medium: {
    rows: 4,
    cols: 4,
    time: 120,
    label: 'Moyen',
    fireIcon: 2,
  },
  hard: {
    rows: 4,
    cols: 5,
    time: 180,
    label: 'Difficile',
    fireIcon: 3,
  },
}
