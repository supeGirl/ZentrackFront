import React, {useEffect, useRef, useState} from 'react'
import {Loader} from './Loader'
import {shiftsService} from '../services/shifts'
import {utilService} from '../services/util.service'

const ZentrackClock = ({start}) => {
  const [time, setTime] = useState(null)
  const timeInit = useRef(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!start) return
  }, [start])

  useEffect(() => {
    if (!start || timeInit.current) return
    timeInit.current = true

    const fetchAndStartClock = async () => {
      try {
        const raw = await shiftsService.loadTime()
        const initialTime = new Date(raw.datetime)
        if (isNaN(initialTime)) throw new Error('Invalid time format')

        setTime(initialTime)
        const startTime = Date.now()
        const startOffset = initialTime.getTime()

        intervalRef.current = setInterval(() => {
          const now = Date.now()
          setTime(new Date(startOffset + (now - startTime)))
        }, 1000)
      } catch (err) {
        console.error('Clock init error:', err)
      }
    }

    fetchAndStartClock()
32
    return () => clearInterval(intervalRef.current)
  }, [start])

  if (!time) return <Loader />

  // useEffect(() => {
  //   let interval
  //   const fetchAndStartClock = async () => {
  //     try {
  //       const raw = await shiftsService.loadTime()
  //       const initialTime = new Date(raw.datetime)
  //       if (isNaN(initialTime)) throw new Error('Invalid time format')

  //       setTime(initialTime)
  //       const startTime = Date.now()
  //       const startOffset = initialTime.getTime()

  //       interval = setInterval(() => {
  //         const now = Date.now()
  //         setTime(new Date(startOffset + (now - startTime)))
  //       }, 1000)
  //     } catch (err) {
  //       console.error('Clock init error:', err)
  //     }
  //   }

  //   fetchAndStartClock()
  //   return () => clearInterval(interval)
  // }, [])

  // if (!time) return null

  return <div>{time && utilService.formatTime(time)}</div>
}

export default React.memo(ZentrackClock)
