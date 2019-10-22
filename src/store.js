

// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import user from './reducers/user.reducer';
import navigation from './reducers/navigation.reducer';
import products from './reducers/product.reducer';
import processes from './reducers/process.reducer';
import properties from './reducers/property.reducer';

// Root reducer, dev tools n' middleware
const root_reducer = combineReducers ({ user, navigation, products, processes, properties });
const compose_enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const middleware = compose_enhancers ? compose_enhancers (applyMiddleware (thunk)) : applyMiddleware (thunk);

// Inits the store n' exports it
let store = createStore (root_reducer, middleware);
export { store };