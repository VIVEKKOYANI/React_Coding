import {combineReducers, createStore} from 'redux'
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    cartReducer: cartReducer
})

const store = createStore(rootReducer);

export default store;