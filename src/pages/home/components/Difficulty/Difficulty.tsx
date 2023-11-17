import clsx from 'clsx'

import Clock from 'assets/icons/Clock'
import Grid from 'assets/icons/Grid'

type Props = {
  label: string // Nom de la difficulté
  minutes: number // Temps imparti (en minutes)
  cards: number // Nombre de cartes sur la grille
  checked?: boolean // Est-ce que la difficulté est sélectionnée ?
  onCheck: () => void // Fonction à appeler quand on clique sur la difficulté
}

export default function Difficulty({
  label,
  minutes,
  cards,
  checked = false,
  onCheck,
}: Props) {
  return (
    <div
      role="radio"
      aria-checked={checked}
      aria-label={label}
      onClick={onCheck}
      className={clsx(
        'flex flex-col gap-2 items-center px-4 py-2 w-36 shadow-md',
        'border-2 rounded-lg cursor-pointer',
        'transition-colors select-none',
        checked
          ? 'bg-yellow-400 hover:bg-yellow-500 border-yellow-600 text-gray-900'
          : 'bg-purple-700 hover:bg-purple-800 border-purple-900 text-white',
      )}
    >
      <span className="text-lg font-medium">{label}</span>
      <div className="flex justify-between items-center w-full text-sm">
        <div className="flex gap-1 items-center">
          <Clock className="w-4 h-auto" />
          {minutes}min
        </div>
        <div className="flex gap-1 items-center">
          <Grid className="w-4 h-auto" />
          {cards}
        </div>
      </div>
    </div>
  )
}
