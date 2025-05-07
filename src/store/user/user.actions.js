import {userService} from '../../services/user'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {SET_USERS, SET_USER, REMOVE_USER} from './user.types'
import {getShiftsRequest} from '../shifts/shifts.action'

export const getUsersRequest = createAsyncThunk(SET_USERS, async () => {
  const response = await userService.getAllUsers()
  return response
})

export const logInRequest = createAsyncThunk(SET_USER, async ({userData, navigate}, {dispatch}) => {
  try {
    const user = await userService.login(userData)
    const userId = user._id
    if (user.isAdmin) {
      await dispatch(getUsersRequest())
      navigate('/timedashboard')
    }
    await dispatch(getShiftsRequest(userId))
    navigate('/timedashboard')
    return user
  } catch (err) {
    console.error('Faild to loggin', err)
    throw err
  }
})

export const deleteUserRequest = createAsyncThunk(REMOVE_USER, async (id) => {
  const response = await userService.deleteUser(id)
  return response
})

export const logOutRequest = createAsyncThunk('user/logOut', async (_arg, {dispatch}) => {
  await userService.logout()
  dispatch(getShiftsRequest(null))
  dispatch(getUsersRequest())
  return null
})

export const signupRequest = createAsyncThunk('user/signup', async ({userData, navigate}, {dispatch}) => {
  try {
    const user = await userService.signup(userData)
    const userId = user._id
    if (user.isAdmin) {
      dispatch(getUsersRequest())
    }
    dispatch(getShiftsRequest(userId))
    navigate('/timedashboard')
    return user
  } catch (error) {
    console.error('Error in signup:', error)
    throw error
  }
})

export const loadUserFromSession = createAsyncThunk('user/loadUserFromSession', async () => {
  const loggedInUser = userService.getloggedinUser()
  return loggedInUser
})
