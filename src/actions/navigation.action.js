

// Append view
export const APPEND_VIEW = 'APPEND_VIEW';
export let append_view = (( id, label ) => {
  return { type: APPEND_VIEW, payload: { id, label } };
});

// Switch view
export const SWITCH_VIEW = 'SWITCH_VIEW';
export let switch_view = (( id ) => {
  return { type: SWITCH_VIEW, payload: { id } };
});


// Append section
export const APPEND_SECTION = 'APPEND_SECTION';
export let append_section = (( id, label ) => {
  return { type: APPEND_SECTION, payload: ( id, label ) };
});

// Switch section
export const SWITCH_SECTION = 'SWITCH_SECTION';
export let switch_section = (( id ) => {
  return { type: SWITCH_SECTION, payload: { id } };
});