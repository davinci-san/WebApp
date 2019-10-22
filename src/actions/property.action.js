

// Add Property
export const ADD_PROPERTY = 'ADD_PROPERTY';
export let add_property = (( pid, label='Untitled', value='Value' ) => {
  return { type: ADD_PROPERTY, payload: { pid, label, value } };
});

// Remove property
export const REMOVE_PROPERTY = 'REMOVE_PROPERTY';
export let remove_property = ( id => {
  return { type: REMOVE_PROPERTY, payload: { id } }
});