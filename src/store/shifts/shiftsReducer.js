import {shiftsService} from '../../services/shifts'
import {utilService} from '../../services/util.service'

export const SET_START_TIME = 'SET_START_TIME'
export const SET_END_TIME = 'SET_END_TIME'

const initialState = {
  all: [],
  currentShift: {
    startTime:{},
    endTime:{},
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
          user:savedShift.userName,
          startTime:{},
          endTime:{},
        },
      }
    default:
      return state
  }
}
