export const SET_TIME = 'SET_TIME'

const initialState = {
  time: 0,
  isLoading: false,
}

export function shiftsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TIME:
      return {...state, time: action.time}
      
      default:
        return state
  }
}
