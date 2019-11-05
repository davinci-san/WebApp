

// Imports
import {

  INITIATE_FETCH_PROCESSES,
  FINALIZE_FETCH_PROCESSES,
  
  NEW_PROCESS,
  REMOVE_PROCESS,
  EDIT_PROCESS,
  EDIT_PROCESSES,
  SET_CURRENT_PROCESS,

} from '../actions/process.action';

// Initial state
const init_state = {

  fetching: true,
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
          index: e.index,

        };
      });

      // Checks for duplicates
      for (let n = 0; n < elements.length; n ++) {
        for (let i = 0; i < state.elements.length; i ++) {
          if (elements[n].id == state.elements[i].id) {
            elements.splice (n,1); n --;
          }
        }
      }

      // Returns
      return Object.assign ({}, state, {
        fetching: false,
        elements: state.elements.concat (elements)
      });

    }


    // New process
    case NEW_PROCESS: {
      return Object.assign ({}, state, {
        id_counter: state.id_counter+1,
        elements: state.elements.concat ([{
          
          id: state.id_counter,
          product_id: action.payload.pid,
          label: action.payload.label,
          desc: 'Description',
          index: 'new',

          props: [ ],
          notes: [ ],

        }])
      })
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