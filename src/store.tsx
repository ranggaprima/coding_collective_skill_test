import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import medicineReducer from './reducers/medicineReducer'

const reducer = combineReducers({
    medicine: medicineReducer,
});
  

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
