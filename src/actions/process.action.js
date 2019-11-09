

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
export const INITIATE_NEW_PROCESS = 'INITIATE_NEW_PROCESS';
export const FINALIZE_NEW_PROCESS = 'FINALIZE_NEW_PROCESS';
export let new_process = (( user_token, pid, label='Untitled', description='Description' ) => dispatch => {
  
  // Initiates new process
  dispatch ({ type: INITIATE_NEW_PROCESS });

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes
  let on_succes = r => {
    dispatch ({ type: FINALIZE_NEW_PROCESS, payload: {
      id: r._id,
      product_id: r.product_id,
      label: r.label,
      description: r.description,
      index: r.index,
    }});
  };

  // Creates new process
  API.new_process (user_token, pid, label, description)
    .then (on_succes, on_fail);


});

// Remove Process
export const REMOVE_PROCESS = 'REMOVE_PROCESS';
export let remove_process = ((user_token, id) => dispatch => {
  
  // Removes process on client
  dispatch ({ type: REMOVE_PROCESS, payload: { id } });

  // Remove process on server
  API.delete_process (user_token, id)
    .then (_=>{}, e => { console.log (e) });

});

// Edit Process
export const EDIT_PROCESS = 'EDIT_PROCESS';
export let edit_process = (( user_token, id, info={} ) => dispatch => {

  // Edits process on client
  dispatch ({ type: EDIT_PROCESS, payload: { id, info } });

  // Edits process on server
  API.edit_process (user_token, id, info)
    .then (_=>{}, e => { console.log (e); })

});

// Edit processess
export const EDIT_PROCESSES = 'EDIT_PROCESSES';
export let edit_processes = (( user_token, ids=[], info=[{}] ) => dispatch => {
  
  // Edits processes on client
  dispatch ({ type: EDIT_PROCESSES, payload: { ids, info } });

  // Edits processes on server
  API.edit_process (user_token, ids, info)
    .then (_=>{}, e => { console.log (e); });

});

// Set Current Process
export const SET_CURRENT_PROCESS = 'SET_CURRENT_PROCESS';
export let set_current_process = ( id => {
  return { type: SET_CURRENT_PROCESS, payload: { id } };
});

