

// Imports
import { 
  get_request, 
  post_request, 
  delete_request, 
  put_request
} from './request.api';


// Fetch products
export let fetch_products = ( user_token ) => 
  new Promise (( resolve, reject ) => {

  get_request ('product', [ 
    { key: 'user_token', value: user_token }, 
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  )

});

// New product
export let new_product = (user_token, label='', description='') => 
  new Promise (( resolve, reject ) => {

  post_request ( 'product', 
    `label=${label}&description=${description}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Delete product
export let delete_product = (user_token, pid) =>
  new Promise (( resolve, reject ) => {

  delete_request ( 'product', 
    `id=${pid}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Edit product
export let edit_product = (user_token, id, info) =>
  new Promise (( resolve, reject ) => {

  put_request ( 'product', 
    `id=${id}&info=${JSON.stringify (info)}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});
  


