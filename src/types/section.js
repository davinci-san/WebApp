

// Imports
import React from 'react';

// View Component
export default class SectionComponent
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = {
      active: false,
      left: 0,
    };
  }

  // Renders
  // Main render
  render () { return (
    
    <div className={'section'+(this.state.active?' active':'')} id={this.props.id}>
      <div className="section-inner" style={{ left: (-this.state.left)+'px' }}>
        { this.props.children }
      </div>
    </div>

  )}

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let active = state.navigation.current_section == this.props.id;
    
    let view = document.querySelectorAll ('#'+this.props.id+' #'+state.navigation.current_view);
    let left = view.length ? view[0].offsetLeft : 0;

    // Sets state
    this.setState ({
      active,
      left,
    });

  }

  // Component did mount
  componentDidMount () {
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    ); this.onStoreChange ();
  }

  // Component will unmount
  componentWillUnmount () {
    this.unsub ();
  }

}