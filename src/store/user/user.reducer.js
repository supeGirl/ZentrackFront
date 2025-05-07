import {createSlice} from '@reduxjs/toolkit'
import {userService} from '../../services/user'
import {deleteUserRequest, getUsersRequest, loadUserFromSession, logInRequest, logOutRequest} from './user.actions'

const initialState = {
  loggedinUser: {},
  users: [],
}

const userssSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersRequest.pending, (state, action) => {})
    builder.addCase(getUsersRequest.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      }
    })
    builder.addCase(deleteUserRequest.pending, (state, action) => {})
    builder.addCase(deleteUserRequest.fulfilled, (state, action) => {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      }
    })
    .addCase(logInRequest.fulfilled, (state, action) => {
      state.loggedinUser = action.payload
    })
    .addCase(logOutRequest.fulfilled, (state, action) => {
      state.loggedinUser = action.payload
    })
    .addCase(loadUserFromSession.fulfilled, (state, action) => {
      state.loggedinUser = action.payload
    })
  },
})

export const usersReducer = userssSlice.reducer
