

// Add step
export const ADD_STEP = 'ADD_STEP';
export let add_step = (( pid, label="Untitled" ) => {
  return { type: ADD_STEP, payload: { pid, label } };
});

// Save step
export const EDIT_STEP = 'EDIT_STEP';
export let edit_step = (( id, info={} ) => {
  return { type: EDIT_STEP, payload: { id, info } };
});

// Remove step
export const REMOVE_STEP = 'REMOVE_STEP';
export let remove_step = (( id ) => {
  return { type: REMOVE_STEP, payload: { id } };
});