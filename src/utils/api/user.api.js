

// Imports
import { get_request } from './request.api';

// Fetch user token
export let fetch_user_token = ( mail, pass ) => 
  new Promise (( resolve, reject ) => {

  get_request ('user/token', [ 
    { key: 'mail', value: mail }, 
    { key: 'pass', value: pass }, 
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  )

});

// Fetch invite token
export let fetch_invite_token = (user_token, role) =>
  new Promise (( resolve, rejet ) => {

  get_request ('user/invite', [
    { key: 'user_token', value: user_token },
    { key: 'role', value: role },
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Fetch users
export let fetch_users = (user_token) =>
  new Promise (( resolve, reject ) => {

  get_request ('user', [
    { key: 'user_token', value: user_token },
    { key: 'fields', value: 'name,mail,role' },
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});