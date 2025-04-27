import {userService} from '../../services/user'
import {store} from '../store.js'
import {SET_USERS ,SET_USER, REMOVE_USER} from './user.reducer.js'
import { LOADING_DONE, LOADING_START } from '../system/system.reducer.js'

export async function loadUsers() {
  try {
      store.dispatch({ type: LOADING_START })
      const users = await userService.query()      
      store.dispatch({ type: SET_USERS, users })
  } catch (err) {
      console.log('UserActions: err in loadUsers', err)
  } finally {
      store.dispatch({ type: LOADING_DONE })
  }
}
export async function loadUser(userId) {
  try {
      const user = await userService.getById(userId)
      // store.dispatch({ type: SET_WATCHED_USER, user })
      console.log('user', user)
      
  } catch (err) {
      showErrorMsg('Cannot load user')
      console.error('Cannot load user', err)
  }
}

export async function removeUser(userId) {
  try {
      await userService.remove(userId)
      store.dispatch({ type: REMOVE_USER, userId })
  } catch (err) {
      console.error('UserActions: err in removeUser', err)
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    console.log('user login:', user)
    store.dispatch({type: SET_USER, user})
  } catch (err) {
    console.error('user actions -> Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    
    
    store.dispatch({type: SET_USER, user})
  } catch (err) {
    console.error('user actions -> Cannot signup', err)
    throw err
  }
}

export async function logout(credentials) {
  try {
    await userService.logout(credentials)
    store.dispatch({type: SET_USER, user: null})
  } catch (err) {
    console.error('user actions -> Cannot logout', err)
    throw err
  }
}


