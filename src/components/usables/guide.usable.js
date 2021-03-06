

// Imports
import React from 'react';
import Grid from './subusables/grid.usable';

import { 
  add_step, 
  edit_step,
  remove_step 
} from '../../actions/step.action';

// Properties component
export default class Guide
  extends React.Component {

  // Constructors
  // Main constructor
  constructor (props) {
    super (props);
    this.state = {
      
      user_token: null,
      fetching: false,
      creating: false,
      
      elements: [ ],
      pid: null,

    };
  }


  // Renders
  // Main render
  render () { return (
    
    <div className="steps">
      <Grid 
      
        id="process-steps" numbered={true} single={true}
        params={{ label: 'Guide', empty_label: 'Guide empty' }}
        elements={this.state.elements} 
        addCb={this.add.bind (this)}
        saveCb={this.save.bind (this)}
        removeCb={this.remove.bind (this)}
        fetching={this.state.fetching}
        creating={this.state.creating}
        editable={this.props.editable}
        current={this.state.pid}
      
      />
    </div>
 
  )}


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts
    let state = this.props.store.getState ();
    let user_token = state.user.token;
    let fetching = state.steps.fetching;
    let creating = state.steps.creating;
    let elements = state.steps.elements;
    let current = state.processes.current;

    // Sets state
    this.setState ({
      user_token,
      fetching, creating,
      pid: current,
      elements: elements.filter (e => {
        return e.pid == current;
      })
    });

  }

  // Component did mount
  componentDidMount () {
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    );
  }

  // Component will unmount
  componentWillUnmount () {
    this.unsub ();
  }


  // Actions
  // Add property
  add () {
    this.props.store.dispatch (
      add_step (this.state.user_token, this.state.pid)
    );
  }

  // Save property
  save (elem, label ) {
    this.props.store.dispatch (
      edit_step (this.state.user_token, elem.id, { label })
    );
  }

  // Remove property
  remove (elem) {
    this.props.store.dispatch (
      remove_step (this.state.user_token, elem.id)
    );
  }

}