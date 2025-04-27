import { legacy_createStore as createStore, combineReducers } from 'redux'
import { shiftsReducer } from './shifts/shiftsReducer'
import { userReducer } from './user/user.reducer';


const rootReducer = combineReducers({
  shifts: shiftsReducer, 
  userModule: userReducer,

})

export const action = (type, payload) => ({
  type,
  payload,
});

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)



// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
