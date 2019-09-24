

// Imports
import {
  SIGN_IN,
  SIGN_OUT
} from '../actions/user.action';

// Initial state
const init_state = {
  signed_in: false,
  token: null,
  info: {  }
};

// User reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Sign in
    case SIGN_IN: {
      return Object.assign ({}, state, {
        signed_in: true,
        token: action.payload.token,
        info: action.payload.info,
      });
    }

    // Sign out
    case SIGN_OUT: {
      return Object.assign ({}, state, {
        signed_in: false,
        token: null,
        info: [ ],
      });
    }

    // Default case
    default: {
      return state;
    }

  }
});
