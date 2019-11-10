

// Imports
import {

  INITIATE_FETCH_PRODUCTS,
  FINALIZE_FETCH_PRODUCTS,

  INITIATE_NEW_PRODUCT,
  FINALIZE_NEW_PRODUCT,

  REMOVE_PRODUCT,
  EDIT_PRODUCT,
  SET_CURRENT_PRODUCT,

} from '../actions/product.action';

// Initial state
const init_state = {
  
  fetching: false,
  creating: false,
  
  current: null,
  elements: [ ],

};

// Products reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Fetch products
    // Initiate fetch products
    case INITIATE_FETCH_PRODUCTS: {
      return Object.assign ({}, state, {
        fetching: true,
      });
    }

    // Finalize fetch products
    case FINALIZE_FETCH_PRODUCTS: {
      return Object.assign ({}, state, {
        fetching: false,
        elements: action.payload.elements,
      });
    }


    // Create products
    // Initiate new product
    case INITIATE_NEW_PRODUCT: {
      return Object.assign ({}, state, {
        creating: true,
      });
    }

    // Finalize new Product
    case FINALIZE_NEW_PRODUCT: {
      return Object.assign ({}, state, {

        creating: false,
        elements: state.elements.concat ([{
          
          id: action.payload.id,
          label: action.payload.label,
          description: action.payload.description,
          processes: 0,
          new: true, 

        }])

      });
    }


    // Remove product
    case REMOVE_PRODUCT: {

      // Fetches index
      let n, e = state.elements.concat ([]);
      for (n = 0; n < e.length; n ++) {
        if (e[n].id==action.payload.id) {
          e.splice (n,1);
        };
      }

      // Returns
      return Object.assign ({}, state, {
        elements: e
      });

    }

    // Edit product
    case EDIT_PRODUCT: {

      // Fetches index
      let n;
      for (n = 0; n < state.elements.length; n ++) {
        if (state.elements[n].id==action.payload.id) {
          break;
        };
      }

      // Sets element
      let elements = state.elements;
      elements[n] = Object.assign ({}, 
        state.elements[n], 
        action.payload.info,
        { new: false }
      );

      // Returns
      return Object.assign ({}, state, {
        elements
      });

    }

    // Set current products
    case SET_CURRENT_PRODUCT: {
      
      // Sets new to false
      let e = state.elements.concat ([]);
      for (let n = 0; n < e.length; n ++) {
        if (e[n].id == action.payload.id) {
          e[n].new = false; break;
        }
      }
      
      // Returns
      return Object.assign ({}, state, {
        current: action.payload.id,
        elements: e,
      });

    }

    // Default
    default: {
      return state;
    }

  }
});