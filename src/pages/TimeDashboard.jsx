import {Avatar} from '@mui/material'
import {ZentrackClock} from '../cmps/zentreckClock'
import {useRef, useState, useEffect} from 'react'
import { utilService } from '../services/util.service'

export function TimeDashboard() {
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [isCounting, setIsCounting] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  function startTimer() {
    if (!isCounting) {
      setSecondsPassed(0)
      setIsCounting(true)
      intervalRef.current = setInterval(() => {
        setSecondsPassed((prev) => prev + 1)
      }, 1000)
    }
  }

  function stopTimer() {
    if (isCounting) {
      clearInterval(intervalRef.current)
      setIsCounting(false)
    }
  }

  return (
    <>
      <header className="user-info-container">
        <div className="user-avater-container">
          <span className="user-avater">
            <Avatar src="/broken-image.jpg" />
          </span>
        </div>

        <div className="welcoming-container">Hello User!!</div>

        <section className="user-stats">
          <div className="deficiencies">Deficiencies 0</div>
          <div className="total-time">Total 47:31</div>
          <div className="missing">Missing 0</div>
        </section>
      </header>

      <main className="user-actions-container">
        <section className="user-actions">
          <div className="time-container">
            <ZentrackClock />
          </div>

          <div className="actions-btns">
            <button className="in-action" onClick={startTimer}>
              In
            </button>
            <button className="out-action" onClick={stopTimer}>
              Out
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <section className="interval-section">
          <div className="time-interval">
            {isCounting && <p>Working... {utilService.formatDuration(secondsPassed)}</p>}
            {!isCounting && secondsPassed > 0 && <p>You worked {utilService.formatDuration(secondsPassed)}</p>}
          </div>
        </section>
      </footer>
    </>
  )
}
