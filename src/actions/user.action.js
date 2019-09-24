

// Sign in
export const SIGN_IN = 'SIGN_IN';
export const sign_in = (( info, token ) => {
  return { type: SIGN_IN, payload: { info, token } };
});

// Sign out
export const SIGN_OUT = 'SIGN_OUT';
export const sign_out = ( _ => {
  return { type: SIGN_OUT };
});