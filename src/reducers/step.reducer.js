

// Imports
import {
  
  INITIATE_FETCH_STEPS,
  FINALIZE_FETCH_STEPS,
  
  INITIATE_ADD_STEP,
  FINALIZE_ADD_STEP,

  REMOVE_STEP,
  EDIT_STEP

} from '../actions/step.action';

// Initial state
const init_state = {
  
  fetching: false,
  creating: false,
  
  elements: [ ],
  id_counter: 0,

};

// Steps reducer
export default (( state=init_state, action ) => {
  switch (action.type) {

    // Fetch steps
    // Initiate fetch steps
    case INITIATE_FETCH_STEPS: {
      return Object.assign ({}, state, {
        fetching: true
      });
    }

    // Finalize fetch steps
    case FINALIZE_FETCH_STEPS: {
      return Object.assign ({}, state, {
        fetching: false,
        elements: action.payload.elements.map (e => {
          return {

            id: e._id,
            pid: e.process_id,
            label: e.label,
            index: e.index,

          }
        })
      });
    }


    // Add step
    // Initiate add step
    case INITIATE_ADD_STEP: {
      return Object.assign ({}, state, {
        creating: true,
      });
    }

    // Finalize add step
    case FINALIZE_ADD_STEP: {
      return Object.assign ({}, state, {
        creating: false,
        elements: state.elements.concat ([{

          id: action.payload.id,
          pid: action.payload.process_id,
          label: action.payload.label,
          index: action.payload.index,

        }])
      });
    }


    // case ADD_STEP: {
    //   return Object.assign ({}, state, {
    //     id_counter: state.id_counter+1,
    //     elements: state.elements.concat ([{
    //       id: state.id_counter, 
    //       pid: action.payload.pid,
    //       label: action.payload.label
    //     }])
    //   })
    // }


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