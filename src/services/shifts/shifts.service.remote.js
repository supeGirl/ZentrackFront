import {httpService} from '../http.service'

const BASE_URL = 'shift/'

export const shiftsService = {
  loadTime,
  getShiftsByUserId,
  startShift,
  stopShift,
  saveShift,
  updateShift,
  deleteShift,
  getAllShifts,
}

async function loadTime() {
  return httpService.get('time')
}

async function getAllShifts() {
  return httpService.get(`${BASE_URL}by-user/${userId}`)
}

async function getShiftsByUserId(userId) {
  return httpService.get(`${BASE_URL}by-user/${userId}`)
}

async function startShift(userId) {
  return httpService.post(`shift/start/${userId}`)
}

async function stopShift() {
  return httpService.post(`shift/stop`)
}

async function saveShift(shift, userId) {
  if (!userId) {
    console.error('No userId provided')
    return
  }

  const data = {
    startTime: shift.startTime,
    endTime: shift.endTime,
    userId: userId,
  }


  try {
    const res = await httpService.post(BASE_URL + 'add', data)
    return res
  } catch (err) {
    console.error('Error saving shift:', err)
    throw err // Rethrow the error to propagate it
  }
}

async function updateShift(shift) {
  return httpService.put(BASE_URL + shift._id, shift)
}

async function deleteShift(id) {
  return httpService.delete(BASE_URL + 'shifts/' + id)
}
