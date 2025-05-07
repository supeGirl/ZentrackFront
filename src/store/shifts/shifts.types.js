export const LOG_CLOCK_IN = 'LOG_CLOCK_IN'
export const LOG_CLOCK_OUT = 'LOG_CLOCK_OUT'
export const GET_SHIFTS_REQUEST = 'GET_SHIFTS_REQUEST'
export const SAVE_SHIFT_REQUEST = 'SAVE_SHIFT_REQUEST'
export const UPDATE_SHIFT_REQUEST = 'UPDATE_SHIFT_REQUEST'
export const DELETE_SHIFT_REQUEST = 'DELETE_SHIFT_REQUEST'
export const START_SHIFT_REQUEST = 'START_SHIFT_REQUEST'
export const STOP_SHIFT_REQUEST = 'STOP_SHIFT_REQUEST'

export const initialState = {
  all: [],
  currentShift: {
    startTime: {},
    endTime: {},
  },

  loading: false,
  error: null,
}
