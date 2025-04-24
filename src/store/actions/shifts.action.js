import {SET_TIME} from '../reducers/shiftsReducer'
import {LOADING_DONE, LOADING_START} from '../reducers/system.reducer'
import {store} from '../store'
import { shiftsService } from '../../services/shifts'

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
