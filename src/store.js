import { createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './Redux/Reducers'

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(reducers),);

export default store;