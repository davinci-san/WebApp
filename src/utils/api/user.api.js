

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