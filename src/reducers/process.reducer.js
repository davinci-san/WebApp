

// Imports
import {
  
  NEW_PROCESS,
  REMOVE_PROCESS,
  EDIT_PROCESS,
  EDIT_PROCESSES,
  SET_CURRENT_PROCESS,

  ADD_PROCESS_PROPERTY,
  EDIT_PROCESS_PROPERTY,
  REMOVE_PROCESS_PROPERTY,

  ADD_PROCESS_NOTE,
  REMOVE_PROCESS_NOTE,

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
          desc: 'Description',
          index: 'new',

          prop_id_counter: 0,
          note_id_counter: 0,

          props: [ ],
          notes: [ ],

        }])
      })
    }

    // Remove process
    case REMOVE_PROCESS: {

      // Fetches index
      let n, e = state.elements.concat ([]);
      for (n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.id) {
          e.splice (n,1);
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
      for (let n = 0; n < action.payload.ids; n ++) {
        let i = ef (action.payload.ids[n]);
        e[i] = Object.assign ({}, e[i], action.payload.info [n]);
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


    // Add process property
    case ADD_PROCESS_PROPERTY: {

      // Finds element index
      // Returns if not found
      let n, e = state.elements.concat ([]);
      for (n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.pid) {
          if (e[n].props == null) { e[n].props = [ ]; }
          e[n].props.push ([{ label: 'Eyo', value: 'Hrello' }]);
        };
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e,
      });

    }

    // Edit process property
    case EDIT_PROCESS_PROPERTY: {

      // Finds element index
      // Returns if not found
      let e = state.elements.concat ([]), n, i;
      for (n = 0; n <= e.length; n ++) {
        if (e[n] == null) return; 
        if (e[n].id == action.payload.pid) break;
      }

      // Finds property index
      // Returns if not found
      for (i = 0; i <= e[n].properties.length; i ++) {{
        if (e[n].properties[i] == null) return;
        if (e[n].properties[i].id == action.payload.id) break;
      }}

      // Edits property
      e[n].properties[i] = Object.assign ({}, e[n].properties[i], 
        action.payload.info
      );

      // Returns
      return Object.assign ({}, state, {
        elements: e,
      });

    }

    // Remove process property
    case REMOVE_PROCESS_PROPERTY: {

      // Finds element index
      // Returns if not found
      let e = state.elements.concat ([]), n, i;
      for (n = 0; n <= e.length; n ++) {
        if (e[n] == null) return; 
        if (e[n].id == action.payload.pid) break;
      }

      // Finds property index
      // Returns if not found
      for (i = 0; i <= e[n].properties.length; i ++) {{
        if (e[n].properties[i] == null) return;
        if (e[n].properties[i].id == action.payload.id) break;
      }}

      // Removes property
      e[n].properties.splice (i, 1);

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