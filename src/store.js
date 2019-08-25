

// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import navigation from './reducers/navigation.reducer';

// Root reducer, dev tools n' middleware
const root_reducer = combineReducers ({ navigation });
const compose_enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const middleware = compose_enhancers ? compose_enhancers (applyMiddleware (thunk)) : applyMiddleware (thunk);

// Inits the store n' exports it
let store = createStore (root_reducer, middleware);
export { store };