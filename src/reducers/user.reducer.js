

// Imports
import {
  INITIATE_SIGN_IN,
  FAIL_SIGN_IN,
  FINALIZE_SIGN_IN,
  SIGN_OUT,
} from '../actions/user.action';

// Initial state
const init_state = {

  signing_in: false,
  failed_sign_in: false,
  signed_in: false,

  token: null,
  info: {  }

};

// User reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Sign ins
    // Initiates sign in
    case INITIATE_SIGN_IN: {
      return Object.assign ({}, state, {
        signing_in: true,
        failed_sign_in: false,
        signed_in: false,
      });
    }

    // Fail sign in
    case FAIL_SIGN_IN: {
      return Object.assign ({}, state, {
        signing_in: false,
        failed_sign_in: true,
        signed_in: false,
      });
    }

    // Finalize sign in
    case FINALIZE_SIGN_IN: {
      return Object.assign ({}, state, {
        
        signing_in: false, 
        failed_sign_in: false,
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
