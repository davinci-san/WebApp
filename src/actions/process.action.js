

// New Process
export const NEW_PROCESS = 'NEW_PROCESS';
export let new_process = (( pid, label='Untitled' ) => {
  return { type: NEW_PROCESS, payload: { pid, label } };
});

// Remove Process
export const REMOVE_PROCESS = 'REMOVE_PROCESS';
export let remove_process = ( id => {
  return { type: REMOVE_PROCESS, payload: { id } };
});

// Edit Process
export const EDIT_PROCESS = 'EDIT_PROCESS';
export let edit_process = (( id, info={} ) => {
  return { type: EDIT_PROCESS, payload: { id, info } };
});

// Edit processess
export const EDIT_PROCESSES = 'EDIT_PROCESSES';
export let edit_processes = (( ids=[], info=[{}] ) => {
  return { type: EDIT_PROCESSES, payload: { ids, info } };
});

// Set Current Process
export const SET_CURRENT_PROCESS = 'SET_CURRENT_PROCESS';
export let set_current_process = ( id => {
  return { type: SET_CURRENT_PROCESS, payload: { id } };
});

