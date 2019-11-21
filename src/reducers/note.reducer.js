

// Imports
import {
  
  INITIATE_FETCH_NOTES,
  FINALIZE_FETCH_NOTES,
  
  INITIATE_ADD_NOTE,
  FINALIZE_ADD_NOTE,
  
  REMOVE_NOTE

} from '../actions/note.action';

// Initial state
const init_state = {
  
  fetching: false,
  creating: false,
  elements: [ ],

};

// Notes reducer
export default (( state=init_state, action ) => {
  switch (action.type) {

    // Fetch notes
    // Initiate fetch notes
    case INITIATE_FETCH_NOTES: {
      return Object.assign ({}, state, {
        fetching: true,
      });
    }

    // Finalize fetch notes
    case FINALIZE_FETCH_NOTES: {
      return Object.assign ({}, state, {
        
        fetching: false,
        elements: action.payload.elements.map (e => { return {

          id: e._id,
          pid: e.process_id,
          uid: e.user_id,
          label: e.label,
          content: e.content,
          date: e.date,

        }})

      });
    }


    // Add note
    // Initiate add note
    case INITIATE_ADD_NOTE: {
      return Object.assign ({}, state, {
        creating: true,
      });
    }

    // Finalize add note
    case FINALIZE_ADD_NOTE: {
      return Object.assign ({}, state, {

        creating: false,
        elements: state.elements.concat ([{
          
          id: action.payload.id,
          pid: action.payload.pid,
          uid: action.payload.uid,
          label: action.payload.label,
          content: action.payload.content,
          date: action.payload.date,

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