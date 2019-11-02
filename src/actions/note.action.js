

// Add note
export const ADD_NOTE = 'ADD_NOTE';
export let add_note = (( pid, uid, label='Untitled', content='No content' ) => {
  return { type: ADD_NOTE, payload: { pid, label, content } };
});

// Remove noye
export const REMOVE_NOTE = 'REMOVE_NOTE';
export let remove_note = ( id => {
  return { type: REMOVE_NOTE, payload: { id } };
});