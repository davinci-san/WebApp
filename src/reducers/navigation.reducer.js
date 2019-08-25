

// Imports
import {
  APPEND_VIEW,
  SWITCH_VIEW,
  APPEND_SECTION,
  SWITCH_SECTION
} from '../actions/navigation.action';

// Initital state
const init_state = {
  
  current_view: '',
  current_section: '',

  views: [ ],
  sections: [ ],

};

// Navigation reducer
export default (( state=init_state,action ) => {
  switch (action.type) {

    // Append view
    case APPEND_VIEW: {

    }

    // Switch view
    case SWITCH_VIEW: {

    }

    // Append section
    case APPEND_SECTION: {

    }

    // Switch section
    case SWITCH_SECTION: {

    }

    // Default case
    default: { 
      return state; 
    }

  }
})