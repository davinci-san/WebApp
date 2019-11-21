

// Imports
import {

  INITIATE_FETCH_TEAM,
  FINALIZE_FETCH_TEAM

} from '../actions/team.action';

// Initial state
const init_state = {

  fetching: false,
  elements: [ ],

};

// Team reducer
export default (( state=init_state, action ) => {
  switch (action.type) {

    // Initiate fetch team
    case INITIATE_FETCH_TEAM: {
      return Object.assign ({}, state, {
        fetching: true,
      });
    }

    // Finalize fetch team
    case FINALIZE_FETCH_TEAM: {
      return Object.assign ({}, state, {
        fetching: false,
        elements: action.payload.elements
      });
    }

    // Default case
    default: {
      return state;
    }

  }
});