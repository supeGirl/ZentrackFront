import {Avatar} from '@mui/material'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ZentrackClock from '../cmps/ZentreckClock'
import {ShiftsList} from '../cmps/ShiftsList'
import {getUsersRequest, loadUserFromSession, logOutRequest} from '../store/user/user.actions'
import {useNavigate} from 'react-router'
import {Loader} from '../cmps/Loader'
import {getShiftsRequest, startShiftRequest, stopShiftRequest} from '../store/shifts/shifts.action'

export function TimeDashboard() {
  const shiftsState = useSelector((state) => state.shifts)
  const {all: shifts, loading: shiftsLoading} = useSelector((state) => state.shifts)
  const {loggedinUser, users} = useSelector((state) => state.userModule)
  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAdmin = loggedinUser?.isAdmin
  

  useEffect(() => {
    dispatch(loadUserFromSession())
  }, [])

  useEffect(() => {
    if (loggedinUser?._id) {
      dispatch(getShiftsRequest(loggedinUser._id))
      if (isAdmin) {
        dispatch(getUsersRequest())
      }
    }
  }, [dispatch, loggedinUser, isAdmin])

  async function startShift() {
    dispatch(startShiftRequest())
  }

  async function stopShift() {
    dispatch(stopShiftRequest())
    dispatch(getShiftsRequest(loggedinUser._id))
  }

  function onLogout() {
    dispatch(logOutRequest(loggedinUser.id))
    navigate('/')
  }

  if (!loggedinUser || shiftsLoading || (isAdmin && users.length === 0)) return <Loader />

  return (
    <>
      <header className="user-info-container">
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
        <div className="user-avater-container">
          <span className="user-avater">
          <Avatar alt={loggedinUser.fullname} src={loggedinUser.imgUrl} />
          </span>
        </div>

        <div className="welcoming-container">{`Hello ${loggedinUser?.fullname}`}</div>

        {/* <section className="user-stats">
          <div className="deficiencies">Deficiencies 0</div>
          <div className="total-time">Total 47:31</div>
          <div className="missing">Missing 0</div>
        </section> */}
      </header>

      <main className="user-actions-container">
        <section className="user-actions">
          <div className="time-container">
            <ZentrackClock start={!!loggedinUser} />
          </div>

          <div className="actions-btns">
            <button className="in-action-btn "
              onClick={startShift}
              disabled={Object.keys(shiftsState.currentShift.startTime).length}
            >
              In
            </button>
            <button className="out-action-btn"
              onClick={stopShift}
              disabled={!Object.keys(shiftsState.currentShift.startTime).length}
            >
              Out
            </button>
          </div>
        </section>

        <section className="user-shifts-list-container">
          <ShiftsList shifts={shifts} isAdmin={isAdmin} users={users} />
        </section>
      </main>
    </>
  )
}
