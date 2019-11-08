

// Imports
import { 
  get_request, 
  post_request, 
  delete_request, 
  put_request
} from './request.api';


// Fetch steps
export let fetch_steps = ( user_token, process_id ) => 
  new Promise (( resolve, reject ) => {

  get_request ('step', [ 
    { key: 'user_token', value: user_token },
    { key: 'process_id', value: process_id },
    { key: 'fields', value: 'label,process_id,index' }
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// New step
export let new_step = (user_token, process_id, label) => 
  new Promise (( resolve, reject ) => {

  post_request ( 'step', 
    `process_id=${process_id}&label=${label}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Deleting step
export let delete_step = (user_token, id) =>
  new Promise (( resolve, reject ) => {

  delete_request ( 'step', 
    `id=${id}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Edit step
export let edit_step = (user_token, id, info) =>
  new Promise (( resolve, reject ) => {

    put_request ( 'step', 
      `id=${id}&info=${JSON.stringify (info)}`, 
      [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
      user_token
    ).then (
      r => { resolve (r) },
      r => { reject (r) }
    );
  
  });
  
