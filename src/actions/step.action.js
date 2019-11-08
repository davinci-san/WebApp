

// Imports
import * as API from '../utils/api/steps.api';


// Fetch Properties
export const INITIATE_FETCH_STEPS = 'INITIATE_FETCH_STEPS';
export const FINALIZE_FETCH_STEPS = 'FINALIZE_FETCH_STEP';
export let fetch_steps = (( user_token, pid ) => dispatch => {

  // Initiates fetch
  dispatch ({ type: INITIATE_FETCH_STEPS });

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes
  let on_succes = r => {
    dispatch ({ 
      type: FINALIZE_FETCH_STEPS, 
      payload: { elements: r } 
    });
  }

  // Fetches properties
  API.fetch_steps (user_token, pid)
    .then (on_succes, on_fail);

});

// Add step
export const INITIATE_ADD_STEP = 'INITIATE_ADD_STEP';
export const FINALIZE_ADD_STEP = 'FINALIZE_ADD_STEP';
export let add_step = (( user_token, pid, label="Untitled" ) => dispatch => {
  
  // Initiates add step
  dispatch ({ type: INITIATE_ADD_STEP });

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes
  let on_succes = r => {
    console.log (r);
    dispatch ({ type: FINALIZE_ADD_STEP, payload: {
      id: r._id,
      process_id: r.process_id,
      label: r.label,
      index: r.index
    }});
  }
  
  // Add step
  API.new_step (user_token, pid, label)
    .then (on_succes, on_fail);

});

// Save step
export const EDIT_STEP = 'EDIT_STEP';
export let edit_step = (( user_token, id, info={} ) => dispatch => {

  // Edits step on client
  dispatch ({ type: EDIT_STEP, payload: { id, info } });

  // Edits step on server
  API.edit_step (user_token, id, info)
    .then (_=>{}, e => { console.log (e); });

});

// Remove step
export const REMOVE_STEP = 'REMOVE_STEP';
export let remove_step = (( user_token, id ) => dispatch => {
  
  // Deletes step on client
  dispatch ({ type: REMOVE_STEP, payload: { id } });

  // Deletes step on server
  API.delete_step (user_token, id)
    .then(_=>{}, e => { console.log (e); });


});