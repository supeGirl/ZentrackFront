import {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {utilService} from '../services/util.service'
import {loadTime} from '../store/actions/shifts.action'

export function ZentrackClock() {
  const dispatch = useDispatch()
  const time = useSelector((state) => state.shifts.time)
  const intervalRef = useRef(null)

  useEffect(() => {
    try {
      loadTime()
      if (!time) return
      intervalRef.current = utilService.getLiveClockUpdater((prevTime) => new Date(prevTime.getTime() + 1000))
      return () => clearInterval(intervalRef.current)
    } catch (err) {
      console.error(`failed to load time ${time}`)
    }
  }, [time])

  return <div className="current-time">{time ? <p>{utilService.formatTime(time)}</p> : <p>Loading time...</p>}</div>
}
