

// Imports
import * as API from '../utils/api/user.api';

// Fetch team
export const INITIATE_FETCH_TEAM = 'INITIATE_FETCH_TEAM';
export const FINALIZE_FETCH_TEAM = 'FINALIZE_FETCH_TEAM';
export let fetch_team = ( user_token => dispatch => {

  // Initiate fetch team
  dispatch ({type: INITIATE_FETCH_TEAM });

  // On succes
  let on_succes = r => {
    dispatch ({ type: FINALIZE_FETCH_TEAM, payload: {
      elements: r.map (e => { return {

        id: e._id,
        name: e.name,
        role: e.role,
        mail: e.mail,
      
      }})
    }});
  }

  // On fail
  let on_fail = e => {
    console.log (e);
  };

  // Fetches team members
  API.fetch_users (user_token)
    .then (on_succes, on_fail);

});