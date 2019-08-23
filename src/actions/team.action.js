

// Get Team
export const GET_TEAM = 'GET_TEAM';
export let get_team = (( id ) => {
  return { type: GET_TEAM, payload: { id } };
});