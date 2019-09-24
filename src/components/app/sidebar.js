

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
      edit: true,
    };
  }

  // Renders
  // Main render
  render () { return ( 

    <div className={'sidebar'+(this.state.active?' active':'')}>
      <header className="header">
        {/* <svg className="logo" viewBox="0 0 512 128.445">
          <use xlinkHref="#icon-logo">
          </use>
        </svg> */}
      </header>

      <footer className="footer">
        
        <div className="to-products button">
          <svg className="icon" viewBox="0 0 24 24">
            <use xlinkHref="#icon-products"></use>
          </svg>

          <div className="label">
            Products
          </div>
        </div>
        
        <div className="to-team button">
          <svg className="icon" viewBox="0 0 24 24">
            <use xlinkHref="#icon-people"></use>
          </svg>

          <div className="label">
            Team Management
          </div>
        </div>

      </footer>
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