import React from 'react'

export default function useTimer(time: number){
    const [timeLeft, setTimeLeft] = React.useState(time)
    const intervalRef= React.useRef<NodeJS.Timer | null>(null)

    React.useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 1 && intervalRef.current){
                    clearInterval(intervalRef.current)
                }
                return prevTime - 1 
            })
        }, 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }


    }, [])


    function clearTimer() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }

    return {
        timeLeft,
        clearTimer,
    }

}