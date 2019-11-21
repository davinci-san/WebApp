

// Imports
import * as API from '../utils/api/note.api';

// Fetch notes
export const INITIATE_FETCH_NOTES = 'INITIATE_FETCH_NOTES';
export const FINALIZE_FETCH_NOTES = 'FINALIZE_FETCH_NOTES';
export const fetch_notes = (( user_token, pid ) => dispatch => {
  
  // Intiates fetch notes
  dispatch ({ type: INITIATE_FETCH_NOTES });

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes
  let on_succes = r => {
    dispatch ({ type: FINALIZE_FETCH_NOTES, payload: {
      elements: r
    }});
  };

  // Sends request
  API.fetch_notes (user_token, pid)
    .then (on_succes, on_fail);

});

// Add note
export const INITIATE_ADD_NOTE = 'INITIATE_ADD_NOTE';
export const FINALIZE_ADD_NOTE = 'FINALIZE_ADD_NOTE';
export let add_note = (( user_token,  pid, content='No content') => 
    dispatch => {
  
  // Initiates add note
  dispatch ({ type: INITIATE_ADD_NOTE });

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes 
  let on_succes = r => { console.log('ey', r);
    dispatch ({ type: FINALIZE_ADD_NOTE, payload: {

      id: r._id,
      pid: r.process_id,
      uid: r.user_id,
      content: r.content,
      date: r.date,

    }});
  };

  // Sends request
  API.new_note (user_token, pid, content)
    .then (on_succes, on_fail);

});


// Remove noye
export const REMOVE_NOTE = 'REMOVE_NOTE';
export let remove_note = ((user_token, id) => dispatch => {

  // Removes note on client
  dispatch ({ type: REMOVE_NOTE, payload: { id } });

  // Removes note on server
  API.delete_note (user_token, id)
    .then (_=>{}, e => { console.log (e); });

});