import {Avatar} from '@mui/material'
import {utilService} from '../services/util.service'

export function ShiftsList({shifts, isAdmin}) {
  function onEditShift(shiftId) {
    console.log(shiftId)
  }
  if (!shifts.length) return <h1>Loading...</h1>

  return (
    <table className="shift-list">
      <thead className="shift-list__header">
        <tr className="shift-list__row">
          {isAdmin && <th className="shift-list__heading">User</th>}
          <th className="shift-list__heading">Date</th>
          <th className="shift-list__heading">Start Time</th>
          <th className="shift-list__heading">End Time</th>
          {isAdmin && <th className="shift-list__heading">Actions</th>}
        </tr>
      </thead>
      <tbody className="shift-list__body">
        {shifts.map((shift) => {
          const {_id, date, startShift, endShift, userImgUrl, userName} = shift

          return (
            <tr key={_id} className="shift-list__row">
              {isAdmin && (
                <td className="shift-list__cell">
                  <div className="user-cell-info">
                    <span className="user-cell">
                      <Avatar src={userImgUrl} alt={userName || 'User'} sx={{width: 40, height: 40}} />
                    </span>
                    <p className="user-name-cell">name test</p>
                  </div>
                </td>
              )}
              <td className="shift-list__cell">{utilService.formatDate(date)}</td>
              <td className="shift-list__cell">{startShift}</td>
              <td className="shift-list__cell">{endShift}</td>
              {isAdmin && (
                <td className="shift-list__cell">
                  <button className="shift-list__edit-btn" onClick={() => onEditShift(_id)}>
                    Edit
                  </button>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
