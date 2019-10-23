

// Imports
import {
  ADD_PROPERTY, 
  REMOVE_PROPERTY,
  EDIT_PROPERTY,
} from '../actions/property.action';

// Initial states
const init_state = {
  id_counter: 0,
  elements: [ ],
};

// Property reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Add property
    case ADD_PROPERTY: {
      return Object.assign ({}, state, {
        id_counter: state.id_counter+1,
        elements: state.elements.concat ([{
          
          id: state.id_counter,
          pid: action.payload.pid,
          label: action.payload.label,
          value: action.payload.value,

        }])
      })
    }

    // Remove property
    case REMOVE_PROPERTY: {

      // Finds and removes property
      let e = state.elements.concat ([]);
      for (let n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.id) {
          e.splice (n, 1); break;
        }
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e,
      });

    }

    // Edit property
    case EDIT_PROPERTY: {

      // Finds and overrides property
      let e = state.elements.concat ([]);
      for (let n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.id) {
          e[n] = Object.assign (e[n], action.payload.info); 
          break;
        }
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e,
      });

    }

    // Default case
    default: {
      return state;
    }

  }
});