

// Imports
import {
  NEW_PRODUCT,
  REMOVE_PRODUCT,
  EDIT_PRODUCT,
  SET_CURRENT_PRODUCT,
} from '../actions/product.action';

// Initial state
const init_state = {
  id_counter: 0,
  current: null,
  elements: [ ],
};

// Products reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // New Product
    case NEW_PRODUCT: {
      return Object.assign ({}, state, {
        id_counter: state.id_counter+1,
        elements: state.elements.concat ([{
          
          id: state.id_counter,
          label: action.payload.label,
          desc: action.payload.desc,
          processes: 0,

        }])
      });
    }

    // Remove product
    case REMOVE_PRODUCT: {

      // Fetches index
      let n, e = state.elements.concat ([]);
      for (n = 0; n < e.length; n ++) {
        if (e[n].id==action.payload.id) {
          e.splice (n,1);
        };
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e
      });

    }

    // Edit product
    case EDIT_PRODUCT: {

      // Fetches index
      let n;
      for (n = 0; n < state.elements.length; n ++) {
        if (state.elements[n].id==action.payload.id) {
          break;
        };
      }

      // Sets setters
      let setters = { };
      if (action.payload.label) { setters.label=action.payload.label; }
      if (action.payload.desc) { setters.desc=action.payload.desc; }

      // Sets element
      let elements = state.elements;
      elements[n] = Object.assign ({}, state.elements[n], setters);

      // Returns
      return Object.assign ({}, state, {
        elements
      });

    }

    // Set current products
    case SET_CURRENT_PRODUCT: {
      return Object.assign ({}, state, {
        current: action.payload.id,
      });
    }

    // Default
    default: {
      return state;
    }

  }
});