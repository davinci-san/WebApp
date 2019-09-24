

// Imports
import {
  APPEND_VIEW,
  SWITCH_VIEW,
  APPEND_SECTION,
  SWITCH_SECTION,
} from '../actions/navigation.action';

// Initital state
const init_state = {
  
  current_view: 'sidebar',
  current_section: 's_products',
  views: [ ],
  sections: [ ],

  current_product: null,

};

// Navigation reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Append view
    case APPEND_VIEW: {
      return Object.assign ({}, state, {
        views: state.views.concat ([
          action.payload.id,
        ])
      });
    }

    // Switch view
    case SWITCH_VIEW: {
      return Object.assign ({}, state, {
        current_view: action.payload.id,
      });
    }


    // Append section
    case APPEND_SECTION: {
      return Object.assign ({}, state, {
        sections: state.sections.concat ([
          action.payload.id
        ])
      });
    }

    // Switch section
    case SWITCH_SECTION: {
      return Object.assign ({}, state, {
        current_view: action.payload.id,
      });
    }


    // Default case
    default: { 
      return state; 
    }

  }
})