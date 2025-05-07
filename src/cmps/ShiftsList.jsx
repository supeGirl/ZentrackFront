import {Avatar, TextField, Button} from '@mui/material'
import {utilService} from '../services/util.service'
import {Loader} from './Loader'
import {updateShiftRequest} from '../store/shifts/shifts.action'
import {useDispatch} from 'react-redux'
import {useState} from 'react'

export function ShiftsList({shifts, isAdmin, users = []}) {
  const dispatch = useDispatch()
  const [editShiftId, setEditShiftId] = useState(null)
  const [newStartTime, setNewStartTime] = useState('')
  const [newEndTime, setNewEndTime] = useState('')

  function onEditClick(shift) {
    setEditShiftId(shift._id)
    setNewStartTime(utilService.formatTimeWithoutSec(shift.startTime))
    setNewEndTime(utilService.formatTimeWithoutSec(shift.endTime))
  }

  function onSave(shift) {
    const updatedShift = {
      ...shift,
      startTime: newStartTime,
      endTime: newEndTime,
    }
    dispatch(updateShiftRequest(updatedShift))
    setEditShiftId(null)
  }

  if (!Array.isArray(shifts) || shifts.length === 0) return <Loader />
  const gridRowClass = `shift-grid shift-grid--row ${isAdmin ? 'admin' : 'user'}`;
  const gridHeaderClass = `shift-grid shift-grid--header ${isAdmin ? 'admin' : 'user'}`;

  return (
    <div className="shift-grid-wrapper">
      <div className={gridHeaderClass}>
        {isAdmin && <div className="shift-grid__cell">Employees</div>}
        <div className="shift-grid__cell">Date</div>
        <div className="shift-grid__cell">Start Time</div>
        <div className="shift-grid__cell">End Time</div>
        {isAdmin && <div className="shift-grid__cell">Actions</div>}
      </div>

      <div className="shift-grid__body">
        {shifts.map((shift) => {
          const {_id, userId, startTime, endTime} = shift
          const user = isAdmin ? users.find((user) => user._id === userId) : null
          const date = utilService.formatDate(startTime)
          const startShift = utilService.formatTimeWithoutSec(startTime)
          const endShift = utilService.formatTimeWithoutSec(endTime)
          const isEditing = _id === editShiftId


          return (
            <div key={_id} className={gridRowClass}>
              {isAdmin && (
                <div className="shift-grid__cell">
                  <div className="user-cell-info">
                    <div className="user-cell-avatar-icon">
                      <span>
                        <Avatar className='avatar-icon'
                          src={user?.imgUrl || 'https://default.avatar.url/placeholder.png'}
                          alt={user?.fullname || 'Unknown User'}
                        />
                      </span>
                    </div>
                    <p className="user-name-cell">{user?.fullname || 'Unknown User'}</p>
                  </div>
                </div>
              )}
              <div className="shift-grid__cell">{date}</div>
              <div className="shift-grid__cell">
                {isEditing ? (
                  <input type="time" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} />
                ) : (
                  <span>{startShift}</span>
                )}
              </div>
              <div className="shift-grid__cell">
                {isEditing ? (
                  <input type="time" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
                ) : (
                  <span>{endShift}</span>
                )}
              </div>
              {isAdmin && (
                <div className="shift-grid__cell">
                  {isEditing ? (
                    <Button onClick={() => onSave(shift)}>Save</Button>
                  ) : (
                    <Button onClick={() => onEditClick(shift)}>Edit</Button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

}
