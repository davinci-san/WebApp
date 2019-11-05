

// Imports
import * as API from '../utils/api/process.api';


// Fetch process
export const INITIATE_FETCH_PROCESSES = 'INITIATE_FETCH_PROCESSES';
export const FINALIZE_FETCH_PROCESSES = 'FINALIZE_FETCH_PROCESSES';
export let fetch_processes = (( user_token, product_id ) => dispatch => {

  // Initiates fetch processes
  dispatch ({ type: INITIATE_FETCH_PROCESSES });

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes
  let on_succes = r => {
    dispatch ({ 
      type: FINALIZE_FETCH_PROCESSES, 
      payload: { elements: r }
    });
  };

  // Actually fetches processes
  API.fetch_processes (user_token, product_id)
    .then (on_succes, on_fail);

});

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

