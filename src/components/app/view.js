

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

        <div className="topbar-buttons">

          { this.props.add != null &&
            <div className="topbar-button add" onClick={this.props.add.bind (this)}>
              <svg viewBox="0 0 24 24" className="inner">
                <use xlinkHref="#icon-add">
                </use>
              </svg>
            </div>
          }

          { this.props.edit != null && 
            <div className="topbar-button edit" onClick={this.props.edit.bind (this)}>
              <svg viewBox="0 0 24 24" className="inner">
                <use xlinkHref="#icon-edit">
                </use>
              </svg>
            </div>
          }

          { this.props.previous_view != null &&
            <div className="topbar-button close" onClick={this.close.bind (this)}>
              <svg viewBox="0 0 24 24" className="inner">
                <use xlinkHref="#icon-close">
                </use>
              </svg> 
            </div>
          }
          

        </div>
      </header>

      <div className="view-body"
        onMouseMove={this.props.onMouseMove}>
        { this.props.children }
      </div>
    </div>

  )}

  // Actions
  // Close
  close () {
    
    if (this.props.close_callback!=null) {
      this.props.close_callback ();
    }

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