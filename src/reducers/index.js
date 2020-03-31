import { combineReducers } from 'redux'
import auth from './auth';
import brand from './brand';
import branch from './branch';
import terminal from './terminal';
import reward from './reward';
export default combineReducers({
  auth,brand,terminal,branch,reward
})

// rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// // This would produce the following state object
// {
//  auths: {
//     // ... potatoes, and other state managed by the potatoReducer ...
//   },
//   tomato: {
//     // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
//   }
// }
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   })
// )