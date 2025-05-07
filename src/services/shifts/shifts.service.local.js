import {storageService} from '../async-storage.service'
import {userService} from '../user'
import { utilService } from '../util.service'

export const shiftsService = {
  loadTime,
  saveShift,
  getShiftsByUserId,
  saveShift,
  updateShift,
  deleteShift,
}
const STORAGE_KEY = 'shiftDB'

const loggedinUser = userService.getloggedinUser
const userId = loggedinUser?._id
const userName = loggedinUser?.fullname

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

function getShiftsByUserId(userId) {
  return storageService.query(STORAGE_KEY).then((shifts) => shifts.filter((shift) => shift.userId === userId))
}

function saveShift(shift) {
  if (shift.id) {
    return storageService.put(STORAGE_KEY, shift)
  } else {
    const loggedinUser = userService.getloggedinUser()
    if (!loggedinUser) throw new Error('No logged-in user')

    shift = {
      ...shift,
      id: utilService.makeId(),
      userId: loggedinUser._id,
      userName: loggedinUser.fullname,
    }
    return storageService.post(STORAGE_KEY, shift)
  }
}

function updateShift(shift) {
  return storageService.put(STORAGE_KEY, shift)
}

function deleteShift(shiftId) {
  return storageService.remove(STORAGE_KEY, shiftId)
}

