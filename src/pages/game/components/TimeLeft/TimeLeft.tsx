import clsx from 'clsx'

import Clock from 'assets/icons/Clock'
import { formatSeconds } from 'utils/time'

type Props = {
  seconds: number
}

export default function Timer({ seconds }: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-2 min-w-[90px]',
        seconds < 10 && 'text-red-600',
      )}
    >
      <Clock className="w-8 h-auto" />
      <span>{formatSeconds(seconds)}</span>
    </div>
  )
}
