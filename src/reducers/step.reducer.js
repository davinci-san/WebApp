

// Imports
import {
  ADD_STEP,
  REMOVE_STEP,
  EDIT_STEP
} from '../actions/step.action';

// Initial state
const init_state = {
  elements: [ ],
  id_counter: 0,
};

// Steps reducer
export default (( state=init_state, action ) => {
  switch (action.type) {

    // Add step
    case ADD_STEP: {
      return Object.assign ({}, state, {
        id_counter: state.id_counter+1,
        elements: state.elements.concat ([{
          id: state.id_counter, 
          pid: action.payload.pid,
          label: action.payload.label
        }])
      })
    }

    // Edit step
    case EDIT_STEP: {

      // Finds element
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

    // Remove step
    case REMOVE_STEP: {

      // Finds element
      let e = state.elements.concat ([]);
      for (let n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.id) {
          e.splice (n,1); break;
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