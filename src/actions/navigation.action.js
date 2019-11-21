

// Append view
export const APPEND_VIEW = 'APPEND_VIEW';
export let append_view = (( id ) => {
  return { type: APPEND_VIEW, payload: { id } };
});

// Switch view
export const SWITCH_VIEW = 'SWITCH_VIEW';
export let switch_view = (( id ) => {
  return { type: SWITCH_VIEW, payload: { id } };
});


// Append section
export const APPEND_SECTION = 'APPEND_SECTION';
export let append_section = (( id ) => {
  return { type: APPEND_SECTION, payload: ( id ) };
});

// Switch section
export const SWITCH_SECTION = 'SWITCH_SECTION';
export let switch_section = (( id ) => {
  return { type: SWITCH_SECTION, payload: { id } };
});


// Toggle mobile
export const TOGGLE_MOBILE = 'TOGGLE_MOBILE';
export let toggle_mobile = (( mobile=null ) => {
  return { type: TOGGLE_MOBILE, payload: { mobile } };
});

// Toggle sidebar
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export let toggle_sidebar = (( active=null ) => {
  return { type: TOGGLE_SIDEBAR, payload: { active } };
});