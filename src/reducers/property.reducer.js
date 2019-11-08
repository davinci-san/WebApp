

// Imports
import {
  
  INITIATE_FETCH_PROPERTIES,
  FINALIZE_FETCH_PROPERTIES,
  
  INITIATE_ADD_PROPERTY,
  FINALIZE_ADD_PROPERTY,
  
  REMOVE_PROPERTY,
  EDIT_PROPERTY,

} from '../actions/property.action';

// Initial states
const init_state = {
  
  fetching: false,
  creating: false,
  elements: [ ],

};

// Property reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Fetch properties
    // Initiate fetch proprerties
    case INITIATE_FETCH_PROPERTIES: {
      return Object.assign ({}, state, {
        fetching: true,
        elements: [ ],
      });
    }

    // Finalize fetch properties
    case FINALIZE_FETCH_PROPERTIES: {
      return Object.assign ({}, state, {
        fetching: false,
        elements: action.payload.elements.map (e => {
          return {

            id: e._id,
            process_id: e.process_id,
            label: e.label,
            value: e.value,

          };
        })
      });
    }


    // Add property
    // Initiate add property
    case INITIATE_ADD_PROPERTY: {
      return Object.assign ({}, state, {
        creating: true,
      });
    }

    // Finalize add property
    case FINALIZE_ADD_PROPERTY: {
      return Object.assign ({}, state, {
        creating: false,
        elements: state.elements.concat ([{

          id: action.payload.id,
          process_id: action.payload.process_id,
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