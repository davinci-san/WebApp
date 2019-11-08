

// Imports
import React from 'react';
import Grid from './subusables/grid.usable';

// Actions
import { 
  add_property, 
  edit_property, 
  remove_property 
} from '../../actions/property.action';


// Properties component
export default class Properties
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
      process_id: null,

    };
  }


  // Renders
  // Main render
  render () { return (
    
    <div className="properties">
      <Grid 
      
        id="process-properties"
        params={{ label: 'Properties', empty_label: 'No properties yet' }}
        elements={this.state.elements} 
        addCb={this.add.bind (this)}
        saveCb={this.save.bind (this)}
        removeCb={this.remove.bind (this)} 
        fetching={this.state.fetching}
        creating={this.state.creating}
      
      />
    </div>
 
  )}


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts
    let state = this.props.store.getState ();
    
    let user_token = state.user.token;
    let fetching = state.properties.fetching;
    let creating = state.properties.creating;

    let elements = state.properties.elements;
    let current = state.processes.current;

    // Sets state
    this.setState ({
      user_token,
      fetching, creating,
      process_id: current, 
      elements: elements.filter (e => {
        return e.process_id == current;
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
    this.props.store.dispatch ( add_property (
      this.state.user_token,
      this.state.process_id
    ));
  }

  // Save property
  save (elem, label, value) {
    this.props.store.dispatch ( edit_property (
      this.state.user_token,   
      elem.id, { label, value }
    ));
  }

  // Remove property
  remove (elem) {
    this.props.store.dispatch ( remove_property (
      this.state.user_token,
      elem.id
    ));
  }

}