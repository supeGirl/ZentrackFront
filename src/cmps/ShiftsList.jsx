export function ShiftsList({shifts}) {
  console.log(shifts)

  if (!shifts.length) return <h1>Loading...</h1>


  return (
    <table className="shift-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => {
          console.log(shift, 'one shift')
          const {startTime, endTime} = shift

          const startDate = startTime.date
          const startShift = startTime.time
          const endShift = endTime.time

          return (
            <tr key={shift.id}>
              <td>{shift.date}</td>
              <td>{startDate}</td>
              <td>{startShift}</td>
              <td>{endShift}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
