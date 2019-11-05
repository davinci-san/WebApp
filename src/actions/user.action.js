

// Imports
import Config from '../../config';
import * as API from '../utils/api/user.api';


// Sign in
export const INITIATE_SIGN_IN = 'INITIATE_SIGN_IN';
export const FAIL_SIGN_IN = 'FAIL_SIGN_IN';
export const FINALIZE_SIGN_IN = 'FINALIZE_SIGN_IN';
export const sign_in = (( mail, pass ) => (dispatch) => {

  // Initiate sign in
  dispatch ({ type: INITIATE_SIGN_IN });

  window.setTimeout (() => {

    // On success
    let on_succes = r => {
      dispatch ({ type: FINALIZE_SIGN_IN, payload: {
        token: r.user_token, info: { role: r.role }
      }});
    };

    // On fail
    let on_fail = r => { 
      dispatch ({ type: FAIL_SIGN_IN });
    };

    // Sends request
    API.fetch_user_token (mail, pass).then (
      on_succes, on_fail
    );

  }, 1000);

});

// Sign out
export const SIGN_OUT = 'SIGN_OUT';
export const sign_out = ( _ => {
  return { type: SIGN_OUT };
});