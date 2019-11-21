

// Imports
import React from 'react';
import * as API from '../../utils/api/user.api';


// Properties component
export default class Guide
  extends React.Component {

  // Constructors
  // Main constructor
  constructor (props) {
    super (props);
    this.state = {

      user_token: null,
      invite_token: null,
      
      role: 0,
      role_label: 'Admin',

    };
  }


  // Renders
  // Main render
  render () { 
    
    let link = 'https://beta.ava-tms.com/invite?token='+this.state.invite_token;

    return (
    
    <div id="team-invite" className={this.state.invite_token!=null?'footer-active':''}>
      <div className="header">
       
        {/* Mail */}
        <input type="text" placeholder="Invitation mail" className="label" />

        {/* Drop down role selector */}
        <div className="drop-down role">
          <div className="current">{this.state.role_label}</div>
          <svg viewBox="0 0 24 24" className="icon">
            <use xlinkHref="#icon-chevron-up">
            </use>
          </svg>
          
          <div className="choices">
            <div className="inner">
              <div className="choice" onClick={this.selectRole.bind (this, 0, 'Admin')}>Admin</div>
              <div className="choice" onClick={this.selectRole.bind (this, 1, 'User')}>User</div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="submit" onClick={this.submit.bind (this)}>
          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-send">
            </use>
          </svg>  
        </div>

      </div>

      <div className="footer">
        <div className="content">
          <span>Did the invitee not receive a mail? Hand them this link:</span>
          <div><a href={link}>{ link }</a></div>
        </div>
      </div>
    </div>
 
  )}


  // Actions
  // Select role
  selectRole (key, label) {
    this.setState ({  
      role: key,
      role_label: label
    });
  }

  // Submit
  submit () {

    // Console logs sjiz
    let label = document.querySelectorAll ('#team-invite .label') [0].value;
    API.fetch_invite_token (this.state.user_token, this.state.role)
      .then(e => { this.setState ({ invite_token: e.invite_token }); });


  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts
    let state = this.props.store.getState ();
    let user_token = state.user.token;

    // Sets state
    this.setState ({
      user_token
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