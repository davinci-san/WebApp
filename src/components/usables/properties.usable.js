

// Imports
import React from 'react';
import Grid from './subusables/grid.usable';
import { add_property, edit_property, remove_property } from '../../actions/property.action';

// Properties component
export default class Properties
  extends React.Component {

  // Constructors
  // Main constructor
  constructor (props) {
    super (props);
    this.state = {
      elements: [ ],
      pid: null,
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
      
      />
    </div>
 
  )}


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts
    let state = this.props.store.getState ();
    let elements = state.properties.elements;
    let current = state.processes.current;

    // Sets state
    this.setState ({
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
      add_property (this.state.pid)
    );
  }

  // Save property
  save (elem, label, value) {
    this.props.store.dispatch (
      edit_property (elem.id, { label, value })
    );
  }

  // Remove property
  remove (elem) {
    this.props.store.dispatch (
      remove_property (elem.id)
    );
  }

}