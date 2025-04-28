import {Avatar} from '@mui/material'
import {ZentrackClock} from '../cmps/zentreckClock'
import {useRef, useState, useEffect} from 'react'
import {setEndTime, setStartTime} from '../store/shifts/shifts.action'
import {useDispatch, useSelector} from 'react-redux'
import {shiftsService} from '../services/shifts'
import {ShiftsList} from '../cmps/ShiftsList'
import {logout} from '../store/user/user.actions'
import {useNavigate} from 'react-router'

export function TimeDashboard() {
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [isCounting, setIsCounting] = useState(false)
  const intervalRef = useRef(null)
  const dispatch = useDispatch()
  const shiftsState = useSelector((state) => state.shifts)
  const user = useSelector((state) => state.userModule.user)
  const navigate = useNavigate()

  console.log(user, 'user')

  useEffect(() => {
    console.log(shiftsState.currentShift)

    // return () => clearInterval(intervalRef.current)
  }, [shiftsState.all])

  async function startTimer() {
    // if (!isCounting) {
    //   setSecondsPassed(0)
    //   setIsCounting(true)
    //   intervalRef.current = setInterval(() => {
    //     setSecondsPassed((prev) => prev + 1)
    //   }, 1000)
    // }
    const time = await shiftsService.loadTime()

    dispatch(setStartTime(time))
  }

  async function stopTimer() {
    // if (isCounting) {
    //   clearInterval(intervalRef.current)
    //   setIsCounting(false)
    // }

    const time = await shiftsService.loadTime()
    dispatch(setEndTime(time))
  }
  function onLogout() {
    logout()
    navigate('/')
  }
  if (!user) return <h1>Loadingg</h1>
    const {isAdmin} = user

  return (
    <>
      <header className="user-info-container">
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
        <div className="user-avater-container">
          <span className="user-avater">
            <Avatar src="/broken-image.jpg" />
          </span>
        </div>

        <div className="welcoming-container">{`hello ${user.fullname}`}</div>

        <section className="user-stats">
          <div className="deficiencies">Deficiencies 0</div>
          <div className="total-time">Total 47:31</div>
          <div className="missing">Missing 0</div>
        </section>
      </header>

      <main className="user-actions-container">
        <section className="user-actions">
          <div className="time-container">{/* <ZentrackClock /> */}</div>

          <div className="actions-btns">
            <button
              className="in-action-btn "
              onClick={startTimer}
              disabled={Object.keys(shiftsState.currentShift.startTime).length}
            >
              In
            </button>
            <button
              className="out-action-btn"
              onClick={stopTimer}
              disabled={!Object.keys(shiftsState.currentShift.startTime).length}
            >
              Out
            </button>
          </div>
        </section>

        <section className="user-shifts-list-container">
          <ShiftsList shifts={shiftsState.all} isAdmin={isAdmin} />
        </section>
      </main>

      {/* <footer className="footer">
        <section className="interval-section">
          <div className="time-interval">
            {isCounting && <p>Working... {utilService.formatDuration(secondsPassed)}</p>}
            {!isCounting && secondsPassed > 0 && <p>You worked {utilService.formatDuration(secondsPassed)}</p>}
          </div>
        </section>
      </footer> */}
    </>
  )
}
