

// Imports
import {

  INITIATE_FETCH_PROCESSES,
  FINALIZE_FETCH_PROCESSES,
  
  INITIATE_NEW_PROCESS,
  FINALIZE_NEW_PROCESS,

  REMOVE_PROCESS,
  EDIT_PROCESS,
  EDIT_PROCESSES,
  SET_CURRENT_PROCESS,

} from '../actions/process.action';

// Initial state
const init_state = {

  fetching: false,
  creating: false,

  current: null,
  elements: [ ],

};

// Processes reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Fetch processes
    // Initiate fetch processes
    case INITIATE_FETCH_PROCESSES: {
      return Object.assign ({}, state, {
        fetching: true,
        elements: [ ],
      });
    }

    // Finalize fetch processes
    case FINALIZE_FETCH_PROCESSES: {
      
      // Cleans data
      let elements = action.payload.elements.map (e => {
        return { 
        
          id: e._id, 
          product_id: e.product_id,

          label: e.label, 
          desc: e.description,
          index: e.index == null ? 'new' : e.index,

        };
      });

      // Returns
      return Object.assign ({}, state, {
        fetching: false,
        elements: elements,
      });

    }


    // New process
    // Initiate new process
    case INITIATE_NEW_PROCESS: {
      return Object.assign ({}, state, {
        creating: true,
      });
    }

    // Finalize new process
    case FINALIZE_NEW_PROCESS: {
      return Object.assign ({}, state, {
        creating: false,
        elements: state.elements.concat ([{
                   
          id: action.payload.id,
          product_id: action.payload.product_id,
          label: action.payload.label,
          desc: action.payload.description,
          index: action.payload.index
          
        }])
      });
    }


    // Remove process
    case REMOVE_PROCESS: {

      // Fetches index
      let e = state.elements.concat ([]);
      for (let n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.id) {
          e.splice (n,1); break;
        };
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e
      });

    }

    // Edit process
    case EDIT_PROCESS: {

      // Fetches index
      let n, e = state.elements.concat ([]);;
      for (n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.id) {
          e[n] = Object.assign ({}, e[n], action.payload.info);
        }
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e,
      });
      
    }

    // Edit processes
    case EDIT_PROCESSES: {

      // Elements
      let e = state.elements.concat ([]);

      // Find element from id
      let ef = id => {
        for (let n = 0; n < e.length; n ++) {
          if (e[n].id == id) return n;
        }
      };

      // Updates info
      for (let n = 0; n < action.payload.ids.length; n ++) {
        let i = ef (action.payload.ids[n]);
        e[i] = Object.assign (e[i], action.payload.info [n]);
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e,
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