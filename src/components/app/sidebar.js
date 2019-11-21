

// Imports
import React from 'react';

// Actions
// Navigation
import { 
  toggle_sidebar, 
  switch_section, 
  switch_view
} from '../../actions/navigation.action';

// Process and product
import { set_current_process } from '../../actions/process.action';
import { set_current_product } from '../../actions/product.action';


// App Instance Component
export default class AppInstance
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = {
      
      active: true,
      edit: true,

    };
  }

  // Renders
  // Main render
  render () { return ( 

    <div className={'sidebar'+(this.state.active?' active':'')}>
      <header className="header">
        <div className="close" onClick={this.close.bind (this)}>
          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-close">
            </use>
          </svg>
        </div>
      </header>

      <footer className="footer">
        
        <div className="to-products button" onClick={this.switchSection.bind (this, 's_products')}>
          <svg className="icon" viewBox="0 0 24 24">
            <use xlinkHref="#icon-products"></use>
          </svg>

          <div className="label">
            Products
          </div>
        </div>
        
        <div className="to-team button" onClick={this.switchSection.bind (this, 's_team_management')}>
          <svg className="icon" viewBox="0 0 24 24">
            <use xlinkHref="#icon-people"></use>
          </svg>

          <div className="label">
            Team
          </div>
        </div>

      </footer>
    </div>

  )}

  // Actions
  // Switch section
  switchSection (id) {
    
    // Switches view
    this.props.store.dispatch ( switch_view ('sidebar'));
    this.props.store.dispatch ( set_current_process (null));
    this.props.store.dispatch ( set_current_product (null));

    // Switches sections
    this.props.store.dispatch (
      switch_section (id)
    );

  }

  // Close
  close () {
    this.props.store.dispatch (
      toggle_sidebar ()
    );
  }

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let active = state.navigation.current_view == 'sidebar';
    let m_active = state.navigation.sidebar_active;
    let mobile = state.navigation.mobile;

    // Sets state
    this.setState ({
      active: mobile ? m_active : active,
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