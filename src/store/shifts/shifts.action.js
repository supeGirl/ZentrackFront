import {SET_START_TIME, SET_END_TIME} from './shiftsReducer'
import {LOADING_DONE, LOADING_START} from '../system/system.reducer'
import {action, store} from '../store'
import {shiftsService} from '../../services/shifts'

export async function loadTime() {
  try {
    store.dispatch({type: LOADING_START})
    const time = await shiftsService.loadTime()

    store.dispatch({type: SET_TIME, time})
  } catch (err) {
    console.error('Cannot load time', err)
    throw err
  } finally {
    setTimeout(() => {
      store.dispatch({type: LOADING_DONE})
    }, 350)
  }
}

export const setStartTime = (time) => {
  return action(SET_START_TIME, time)
}

export const setEndTime = (time) => {
  return action(SET_END_TIME, time)
}
