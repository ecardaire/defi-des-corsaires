import React from 'react'

export default function useTimer(time: number) {
  const [timeLeft, setTimeLeft] = React.useState(time)
  const intervalRef = React.useRef<NodeJS.Timer | null>(null)

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 1 && intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        return prevTimeLeft - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const clearTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  return { timeLeft, clearTimer }
}
