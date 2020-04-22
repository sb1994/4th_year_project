import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

// import { persistStore, persistReducer } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const persistConfig = {
//   key: "root"
// };
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)
export default store
