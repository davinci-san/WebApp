

// Imports
import Config from '../../../config';

// Request
let send_request = (method, suburl, query=[], body=null, headers=[]) => 
  new Promise (( resolve, reject ) => {

  
  // Creates request
  let request = new XMLHttpRequest ();
  request.onload = ( r => {

    // On fail
    if (r.target.status != 200) {
      reject (r); return;
    }

    // On succes
    resolve (JSON.parse (
      r.target.response
    ));

  });

  // Opens request
  let fields = query.map (e => (e.key+'='+e.value)).join ('&');
  request.open (method, Config.api+suburl+'?'+fields);
  
  // Sets headers
  for (let n = 0; n < headers.length; n ++) {
    request.setRequestHeader (
      headers[n].key, headers[n].value
    );
  }

  // Sends request
  request.send (body);

});

// Gets
export let get_request = (suburl, query) => 
  new Promise ((resolve, reject) => {

  send_request ('GET', suburl, query).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Post
export let post_request = (suburl, body, headers, token) => 
  new Promise ((resolve, reject) => {

  let query = [{ key: 'user_token', value: token }];
  send_request ('POST', suburl, query, body, headers).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Put
export let put_request = (suburl, body, headers, token) => 
  new Promise ((resolve, reject) => {

  let query = [{ key: 'user_token', value: token }];
  send_request ('PUT', suburl, query, body, headers).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});

// Delete
export let delete_request = (suburl, body, headers, token) => 
  new Promise ((resolve, reject) => {

  let query = [{ key: 'user_token', value: token }];
  send_request ('DELETE', suburl, query, body, headers).then (
    r => { resolve (r) },
    r => { reject (r) }
  );

});