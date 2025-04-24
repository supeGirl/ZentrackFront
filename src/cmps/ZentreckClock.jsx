import {useEffect, useState, useRef} from 'react'
import {utilService} from '../services/util.service'

export function ZentrackClock() {
  const [currentTime, setCurrentTime] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    fetch('https://timeapi.io/api/Time/current/zone?timeZone=Europe/Berlin')
      .then((res) => res.json())
      .then((data) => {
        const berlinTime = new Date(data.dateTime)
        setCurrentTime(berlinTime)

        intervalRef.current = setInterval(() => {
          setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000))
        }, 1000)
      })
      .catch((error) => {
        console.error('Error fetching time:', error)
      })

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="current-time">
      {currentTime ? <p>{utilService.formatTime(currentTime)}</p> : <p>Loading time...</p>}
    </div>
  )
}
