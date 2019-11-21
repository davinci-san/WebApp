

// Imports
import React from 'react';
import View from '../app/view';
import Invite from '../usables/invite.usable';


// Team management view
export default class TeamManagementView
  extends React.Component {

  // Initilization
  // Constructor
  constructor (props) {
    super (props);
    this.state = { 

      fetching: false,
      team: [ ],

    };
  }

  // Renders
  // Main render
  render () {
    return (
      <View label="Team Management" 
        id="v_team_management" 
        store={this.props.store}>

        <div className="team">
          <Invite store={this.props.store} /><br/>
          { this.state.team.map (e => this.renderUser (e)) }
        </div>

      </View>
    )
  }

  // Render user
  renderUser (elem) { return (
    <div className="user" key={elem.id}>

      <div className="image"></div>
      
      <div className="content">
        <div className="name">{elem.name}</div>
        <div className="mail">{elem.mail} - {elem.role == 0 ? 'Admin' : 'Role'}</div>
      </div>
    
    </div>    
  )}


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let fetching = state.team.fetching;
    let team = state.team.elements;

    // Sets state
    this.setState ({
      fetching,
      team
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