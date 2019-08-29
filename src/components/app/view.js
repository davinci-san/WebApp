

// Imports
import React from 'react';
import { switch_view } from '../../actions/navigation.action';

// View Component
export default class ViewComponent
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = {
      active: false,
    };
  }
  

  // Renders
  // Main render
  render () { return (
    
    <div className={'view'+(this.state.active?' active':'')} id={this.props.id}>
      <header className="view-header">
        <div className="label">
          {this.props.label}
        </div>

        { this.props.previous_view != null &&
          <div className="close" onClick={this.close.bind (this)}>
            <div className="close-inner">
              &times;
            </div>
          </div>
        }
      </header>

      <div className="view-body">
        { this.props.children }
      </div>
    </div>

  )}

  // Actions
  // Close
  close () {
    this.props.store.dispatch (
      switch_view ( this.props.previous_view )
    );
  }

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let active = state.navigation.current_view == this.props.id;

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