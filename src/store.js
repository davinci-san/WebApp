

// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import user from './reducers/user.reducer';
import navigation from './reducers/navigation.reducer';
import products from './reducers/product.reducer';
import processes from './reducers/process.reducer';
import properties from './reducers/property.reducer';
import steps from './reducers/step.reducer';
import notes from './reducers/note.reducer';

// Dev tools n' middleware
const compose_enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const middleware = compose_enhancers ? compose_enhancers (applyMiddleware (thunk)) : applyMiddleware (thunk);

// Root reducer
const root_reducer = combineReducers ({ 
  user, navigation, 
  products, processes, 
  properties, steps, notes 
});

// Inits the store n' exports it
let store = createStore (root_reducer, middleware);
export { store };