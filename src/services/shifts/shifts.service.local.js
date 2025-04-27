export const shiftsService = {
  loadTime,
  saveShift
}

let user = {
  id: 'usertest',
  name: 'user userly',
}

async function loadTime() {
  try {
    const res = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Europe/Berlin')
    if (!res.ok) throw new Error(`Failed to fetch time: ${res.statusText}`)

    const data = await res.json()

    return new Date(data.dateTime)
  } catch (err) {
    console.error('getBerlinTime failed', err)
    throw err
  }
}

async function saveShift(newShift) {
  console.log('newShigt', newShift)
  
  return (userShift = {
    userId: user.id,
    userName: user.name,
    shift: newShift,
  })
}
