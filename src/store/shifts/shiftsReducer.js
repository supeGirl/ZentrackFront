import {shiftsService} from '../../services/shifts'
import {utilService} from '../../services/util.service'

export const SET_START_TIME = 'SET_START_TIME'
export const SET_END_TIME = 'SET_END_TIME'

const initialState = {
  all: [
    {
      _id: 'shift_1',
      userId: 'user_101',
      date: '2025-04-25',
      startShift: '08:00',
      endShift: '16:00',
    },
    {
      _id: 'shift_2',
      userId: 'user_102',
      date: '2025-04-26',
      startShift: '09:00',
      endShift: '17:00',
    },
    {
      _id: 'shift_3',
      userId: 'user_103',
      date: '2025-04-27',
      startShift: '07:30',
      endShift: '15:30',
    },
    {
      _id: 'shift_4',
      userId: 'user_104',
      date: '2025-04-28',
      startShift: '12:00',
      endShift: '20:00',
    },
  ],
  currentShift: {
    startTime: {},
    endTime: {},
  },

  isLoading: false,
}

export function shiftsReducer(state = initialState, action) {
  const {currentShift} = state
  switch (action.type) {
    case SET_START_TIME:
      console.log('action payload', action.payload)
      console.log('action only', action)

      return {...state, currentShift: {...currentShift, startTime: action.payload}}
    case SET_END_TIME:
      const newShift = shiftsService.createShift(currentShift.startTime, action.payload)
      // const savedShift = shiftsService.saveShift(newShift)

      return {
        ...state,
        all: [...state.all, newShift],
        currentShift: {
          user: savedShift.userName,
          startTime: {},
          endTime: {},
        },
      }
    default:
      return state
  }
}
