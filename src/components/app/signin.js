

// Imports
import React from 'react';
import { sign_in } from '../../actions/user.action';

// App Instance Component
export default class SignIn
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { 
      signing_in: false,
      failed_sign_in: false,
    };
  }

  // Renders
  // Main render
  render () { return ( 
    <div id="sign-in">
      <div className="content">

        <input type="mail" className="mail" placeholder="E-mail" />
        <input type="password" className="pass" placeholder="Password" />        

        <div className={'error'+(this.state.failed_sign_in?' active':'')}>
          <div className="inner">
            An Error Occured
          </div>
        </div>

        <div className={'submit'+(this.state.signing_in?' loading':'')} 
          onClick={this.signIn.bind (this)}>  

          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-sign-in">
            </use>
          </svg>
        
          <div className="loader">
            . . .
          </div>
        </div>

      </div>
    </div>
  )}

  // Actions
  // Sign in
  signIn () {

    // Fetches values
    if (this.state.signing_in) { return; }
    let mail = document.querySelectorAll ('#sign-in .mail') [0].value;
    let pass = document.querySelectorAll ('#sign-in .pass') [0].value;

    // Actually signs in
    this.props.store.dispatch (
      sign_in ( mail, pass )
    );

  }

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let user = state.user;

    // Sets state
    this.setState ({
      signing_in: user.signing_in,
      failed_sign_in: user.failed_sign_in,
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

}