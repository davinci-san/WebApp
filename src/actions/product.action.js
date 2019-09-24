

// New product
export const NEW_PRODUCT = 'NEW_PRODUCT';
export let new_product = (( label='', desc='' ) => {
  return { type: NEW_PRODUCT, payload: { label, desc } };
});

// Remove product
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export let remove_product = ( id => {
  return { type: REMOVE_PRODUCT, payload: { id } };
});

// Edit product
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export let edit_product = (( id, label=null, desc=null ) => {
  return { type: EDIT_PRODUCT, payload: { id, label, desc } };
});

// Set current product
export const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
export let set_current_product = ( id => {
  return { type: SET_CURRENT_PRODUCT, payload: { id } };
});