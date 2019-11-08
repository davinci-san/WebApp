

// Imports
import { 
  get_request, 
  post_request, 
  delete_request, 
  put_request
} from './request.api';


// Fetch properties
export let fetch_properties = ( user_token, process_id ) => 
  new Promise (( resolve, reject ) => {

  get_request ('property', [ 
    { key: 'user_token', value: user_token },
    { key: 'process_id', value: process_id },
    { key: 'fields', value: 'label,value,process_id,index' }
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// New property
export let new_property = (user_token, process_id, label, value) => 
  new Promise (( resolve, reject ) => {

  post_request ( 'property', 
    `process_id=${process_id}&label=${label}&value=${value}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Deleting property
export let delete_property = (user_token, id) =>
  new Promise (( resolve, reject ) => {

  delete_request ( 'property', 
    `id=${id}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Edit property
export let edit_property = (user_token, id, info) =>
  new Promise (( resolve, reject ) => {

    put_request ( 'property', 
      `id=${id}&info=${JSON.stringify (info)}`, 
      [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
      user_token
    ).then (
      r => { resolve (r) },
      r => { reject (r) }
    );
  
  });
  
