import clsx from 'clsx'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'small' | 'default' | 'large'
  icon?: React.ReactElement
  disabled?: boolean
  children: React.ReactNode
}

export default function Button({
  size = 'default',
  icon,
  children: text,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        'bg-yellow-400 shadow-md',
        'border-2 border-yellow-600 rounded-md',
        'flex items-center font-medium',
        size === 'small' && 'px-3 py-2 gap-2 text-sm',
        size === 'default' && 'px-5 py-3 gap-3',
        size === 'large' && 'px-6 py-4 gap-3 text-lg',
        props.disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-yellow-500 ',
      )}
      {...props}
    >
      {text}
      {icon &&
        React.cloneElement(icon, {
          className: clsx(
            icon.props.className,
            size === 'small' && 'w-5 h-auto',
            size === 'default' && 'w-6 h-auto',
            size === 'large' && 'w-7 h-auto',
          ),
        })}
    </button>
  )
}
