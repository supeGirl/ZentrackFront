import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {shiftsService} from '../../services/shifts'

import {
  DELETE_SHIFT_REQUEST,
  GET_SHIFTS_REQUEST,
  LOG_CLOCK_IN,
  LOG_CLOCK_OUT,
  SAVE_SHIFT_REQUEST,
  START_SHIFT_REQUEST,
  STOP_SHIFT_REQUEST,
  UPDATE_SHIFT_REQUEST,
} from './shifts.types'

export const logClockIn = createAction(LOG_CLOCK_IN, (time) => {
  return {
    payload: {time},
  }
})

export const logClockOut = createAsyncThunk(LOG_CLOCK_OUT, async (time, {dispatch, getState}) => {
  const state = getState()
  const loggedinUser = state.userModule.loggedinUser

  if (!loggedinUser) {
    console.error('No logged-in user found during clock-out')
    throw new Error('No logged-in user found')
  }

  const shiftData = {
    startTime: state.shifts.currentShift.startTime,
    endTime: time,
  }

  await dispatch(saveShiftRequest(shiftData))
})

export const loadAllShiftsRequest = createAsyncThunk('shifts/loadAll', async () => {
  const response = await shiftsService.getAllShifts()
  return response
})

export const getShiftsRequest = createAsyncThunk(GET_SHIFTS_REQUEST, async (id, {getState}) => {
  const state = getState()
  const response = await shiftsService.getShiftsByUserId(id)
  return response
})

export const startShiftRequest = createAsyncThunk(START_SHIFT_REQUEST, async (_, {getState}) => {
  const state = getState()

  const loggedinUser = state.userModule.loggedinUser
  if (!loggedinUser || !loggedinUser._id) throw new Error('Missing user ID')

  const shift = await shiftsService.startShift(loggedinUser._id)

  return shift
})

export const stopShiftRequest = createAsyncThunk(STOP_SHIFT_REQUEST, async (_, {getState, dispatch}) => {
  const state = getState()
  const {endTime} = await shiftsService.stopShift()
  const cleanedEndTime = endTime?.datetime

  const shiftToSave = {
    startTime: state.shifts.currentShift.startTime,
    endTime: cleanedEndTime,
  }

  await dispatch(saveShiftRequest(shiftToSave))
})

export const saveShiftRequest = createAsyncThunk(SAVE_SHIFT_REQUEST, async (shift, {getState, rejectWithValue}) => {
  const state = getState()

  const loggedinUser = state.userModule.loggedinUser
  if (!loggedinUser || !loggedinUser._id) {
    console.error('No logged-in user ID found')
    return rejectWithValue('No logged-in user ID')
  }

  try {
    const response = await shiftsService.saveShift(shift, loggedinUser._id)
    return response
  } catch (error) {
    console.error('Error saving shift:', error)
    return rejectWithValue(error.message)
  }
})

export const updateShiftRequest = createAsyncThunk(UPDATE_SHIFT_REQUEST, async (shift) => {
  try {
    const response = await shiftsService.updateShift(shift)

    return {shift: response}
  } catch (err) {
    console.error(' error in updateShiftRequest:', err)
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const deleteShiftRequest = createAsyncThunk(DELETE_SHIFT_REQUEST, async (id) => {
  await shiftsService.deleteShift(id)
  return id
})
