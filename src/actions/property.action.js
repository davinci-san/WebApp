

// Imports
import * as API from '../utils/api/property.api';


// Fetch Properties
export const INITIATE_FETCH_PROPERTIES = 'INITIATE_FETCH_PROPERTIES';
export const FINALIZE_FETCH_PROPERTIES = 'FINALIZE_FETCH_PROPERTIES';
export let fetch_properties = (( user_token, pid ) => dispatch => {

  // Initiates fetch
  dispatch ({ type: INITIATE_FETCH_PROPERTIES });

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes
  let on_succes = r => {
    dispatch ({ 
      type: FINALIZE_FETCH_PROPERTIES, 
      payload: { elements: r } 
    });
  }

  // Fetches properties
  API.fetch_properties (user_token, pid)
    .then (on_succes, on_fail);

});

// Add Property
export const INITIATE_ADD_PROPERTY = 'INITIATE_ADD_PROPERTY';
export const FINALIZE_ADD_PROPERTY = 'FINALIZE_ADD_PROPERTY';
export let add_property = (( user_token, pid, label='Untitled', value='Value' ) => dispatch => {

  // Initiates
  dispatch ({ type: INITIATE_ADD_PROPERTY });
  
  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // On succes
  let on_succes = r => {
    console.log (r);
    dispatch ({
      type: FINALIZE_ADD_PROPERTY,
      payload: { 
        id: r._id, process_id: r.process_id, 
        label: r.label, value: r.value 
      }
    })
  }

  // Creates property
  API.new_property (user_token, pid, label, value)
    .then (on_succes, on_fail);


});

// Remove property
export const REMOVE_PROPERTY = 'REMOVE_PROPERTY';
export let remove_property = (( user_token, id ) => dispatch => {
  
  // Removes on client
  dispatch ({ type: REMOVE_PROPERTY, payload: { id } });

  // Removes on server
  API.delete_property (user_token, id)
    .then (_=>{}, e => { console.log (e); })

});

// Edit property
export const EDIT_PROPERTY = 'EDIT_PROPERTY';
export let edit_property = (( user_token, id, info={} ) => dispatch => {
  
  // Edits property on client
  dispatch ({ type: EDIT_PROPERTY, payload: { id, info } });

  // Edits property on server
  API.edit_property (user_token, id, info)
    .then (_=>{}, e => { console.log (e); });

});