

// Imports
import {
  NEW_PROCESS,
  REMOVE_PROCESS,
  SET_CURRENT_PROCESS,
} from '../actions/process.action';

// Initial state
const init_state = {
  current: null,
  id_counter: 0,
  elements: [ ],
};

// Processes reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // New process
    case NEW_PROCESS: {
      return Object.assign ({}, state, {
        id_counter: state.id_counter+1,
        elements: state.elements.concat ([{
          
          id: state.id_counter,
          product_id: action.payload.pid,
          label: action.payload.label,

        }])
      })
    }

    // Remove process
    case REMOVE_PROCESS: {

      // Fetches index
      let n;
      for (n = 0; n < state.elements.length; n ++) {
        if (state.elements[n].id==action.payload.id) {
          state.elements.splice (n,1);
        };
      }

      // Returns
      return Object.assign ({}, state, {
        elements: state.elements
      });

    }

    // Set current process
    case SET_CURRENT_PROCESS: {
      return Object.assign ({}, state, {
        current: action.payload.id,
      });
    }

    // Default case
    default: {
      return state;
    }

  }
});