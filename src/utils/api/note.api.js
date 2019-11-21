

// Imports
import { 
  get_request, 
  post_request, 
  delete_request, 
  put_request
} from './request.api';


// Fetch notes
export let fetch_notes = ( user_token, process_id ) => 
  new Promise (( resolve, reject ) => {

  get_request ('note', [ 
    { key: 'user_token', value: user_token },
    { key: 'process_id', value: process_id },
    { key: 'fields', value: 'label,content,date,user_id,process_id' }
  ]).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// New note
export let new_note = (user_token, process_id, content) => 
  new Promise (( resolve, reject ) => {

  post_request ( 'note', 
    `process_id=${process_id}&content=${content}&date=${(new Date())}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Deleting note
export let delete_note = (user_token, id) =>
  new Promise (( resolve, reject ) => {

  delete_request ( 'note', 
    `id=${id}`, 
    [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
    user_token
  ).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Edit note
export let edit_note = (user_token, id, info) =>
  new Promise (( resolve, reject ) => {

    put_request ( 'note', 
      `id=${id}&info=${JSON.stringify (info)}`, 
      [ { key: 'Content-Type', value: 'application/x-www-form-urlencoded' } ], 
      user_token
    ).then (
      r => { resolve (r) },
      r => { reject (r) }
    );
  
  });
  
