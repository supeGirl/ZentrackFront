import {userService} from '../../services/user'

//* User
export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

const initialState = {
  user: userService.getLoggedinUser(),
  users: [],
}

export function userReducer(state = initialState, action = {}) {
  var newState = state
  switch (action.type) {
    //* User
    case SET_USERS:
      newState = {...state, users: action.users}
      break
    case SET_USER:
      newState = {...state, user: action.user}
      break
    case REMOVE_USER:
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      }

    default:
      return state
  }
  // For debug:
  // window.userState = newState
  // console.log('State:', newState)
  return newState
}
