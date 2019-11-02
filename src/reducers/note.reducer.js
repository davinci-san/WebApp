

// Imports
import {
  ADD_NOTE,
  REMOVE_NOTE
} from '../actions/note.action';

// Initial state
const init_state = {
  id_counter: 0,
  elements: [ ],
};

// Notes reducer
export default (( state=init_state, action ) => {
  switch (action.type) {

    // Add note
    case ADD_NOTE: {
      return Object.assign ({}, state, {
        id_counter: state.id_counter+1,
        elements: state.elements.concat ([{
          
          id: state.id_counter,
          pid: action.payload.pid,
          uid: action.payload.uid,
          label: action.payload.label,
          content: action.payload.content,

        }])
      })
    }

    // Remove note
    case REMOVE_NOTE: {
      
      // Removes note
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

    // Default case
    default: {
      return state;
    }
    
  }
});