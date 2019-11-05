

// Imports
import * as API from '../utils/api/product.api';

// Fetch prdoucts
export const INITIATE_FETCH_PRODUCTS = 'INITIATE_FETCH_PRODUCTS';
export const FINALIZE_FETCH_PRODUCTS = 'FINALIZE_FETCH_PRODUCTS';
export let fetch_products = ( user_token => dispatch => {

  // Dispatches initiate
  dispatch ({ type: INITIATE_FETCH_PRODUCTS });

  window.setTimeout (() => {

    // On fail
    let on_fail = r => {
      return;
    };

    // On succes
    let on_succes = r => {
      
      // Cleans data
      let elements = r.map (e => { return { 
        id: e._id, 
        label: e.label, 
        description: e.description 
      }});

      // Dispatches
      dispatch ({ 
        type: FINALIZE_FETCH_PRODUCTS, 
        payload: { elements }
      });

    };

    // Fetches products
    API.fetch_products ( user_token )
      .then (on_succes, on_fail);

  }, 1000);

});

// New product
export const INITIATE_NEW_PRODUCT = 'INITIATE_NEW_PRODUCT';
export const FINALIZE_NEW_PRODUCT = 'FINALIZE_NEW_PRODUCT';
export let new_product = (( user_token, label='', desc='' ) => dispatch => {

  // Initiates creation process
  dispatch ({ type: INITIATE_NEW_PRODUCT });

  window.setTimeout (() => {

    // On fail
    let on_fail = e => {
      console.log (e);
    };

    // On succes
    let on_succes = r => {
      dispatch ({ type: FINALIZE_NEW_PRODUCT, payload: {  
        id: r._id,
        label: r.label,
        description: r.description,
      }});
    };

    // Creates the product on the server
    API.new_product (user_token, label, desc)
      .then (on_succes, on_fail);

  }, 1000);

});

// Remove product
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export let remove_product = (( user_token, id ) => dispatch => {
  
  // Deletes product on the server
  API.delete_product ( user_token, id )
    .then (_ => { }, r => { console.log (r) });

  // Deletes the product on the client
  dispatch ({ type: REMOVE_PRODUCT, payload: { id } });

});

// Edit product
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export let edit_product = (( user_token, id, info ) => dispatch => {
  
  // Edits product on server
  API.edit_product (user_token, id, info)
    .then (_ => { }, r => { console.log (r) });
  
  // Edits server on client
  dispatch ({ type: EDIT_PRODUCT, payload: { id, info } });

});

// Set current product
export const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
export let set_current_product = ( id => {
  return { type: SET_CURRENT_PRODUCT, payload: { id } };
});