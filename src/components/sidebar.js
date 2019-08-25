

// Imports
import React from 'react';

// App Instance Component
export default class AppInstance
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = {
      active: true,
    };
  }

  // Renders
  // Main render
  render () { return ( 

    <div className={'sidebar'+(this.state.active?' active':'')}>
      BAR
    </div>

  )}

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let active = state.navigation.current_view == 'sidebar';

    // Sets state
    this.setState ({
      active,
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