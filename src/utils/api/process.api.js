

// Imports
import { 
  get_request, 
  post_request, 
  delete_request, 
  put_request
} from './request.api';


// Fetch processes
export let fetch_processes = ( user_token, product_id ) => 
  new Promise (( resolve, reject ) => {

  get_request ('process', [ 
    { key: 'user_token', value: user_token },
    { key: 'product_id', value: product_id },
    { key: 'fields', value: 'label,description,product_id,index' }
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// New process
export let new_process = (user_token, product_id, label, description) => 
  new Promise (( resolve, reject ) => {

  post_request ( 'process', 
    `product_id=${product_id}&label=${label}&description=${description}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Deleting process
export let delete_process = (user_token, id) =>
  new Promise (( resolve, reject ) => {

  delete_request ( 'process', 
    `id=${id}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Edit process
export let edit_process = (user_token, ids, info) =>
  new Promise (( resolve, reject ) => {

    // Cleans data
    if (!Array.isArray (ids)) { ids = [ids]; }
    if (!Array.isArray (info)) { info = [info]; }
    for (let n = 0; n < info.length; n ++) {
      if (info[n].id == null) { info[n].id = ids[n]; }
    }
 
    // Sends request
    put_request ( 'process', 
      `id=${JSON.stringify(ids)}&info=${JSON.stringify (info)}`, 
      [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
      user_token
    ).then (
      r => { resolve (r) },
      r => { reject (r) }
    );
  
  });
  
