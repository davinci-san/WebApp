

// Imports
import {
  GET_TEAM
} from '../actions/team.action';

// Initial state
const init_state = {
  id: null,
  label: null,
  users: [ ],
  products: [ ]
};

// Team reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Get Team
    case GET_TEAM: {
      return state;
    }

    // Default
    default: {
      return state;
    }

  }
});