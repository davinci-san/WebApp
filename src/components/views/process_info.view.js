

// Imports
import React from 'react';
import View from '../app/view';

import Properties from '../usables/properties.usable';
import Guide from '../usables/guide.usable';
import Notes from '../usables/notes.usable';

import { switch_view } from '../../actions/navigation.action';
import { set_current_process, edit_process } from '../../actions/process.action';

// Products view
export default class ProcessInfoView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { 
      
      info: { 
        label: '',
        desc: '',
      },

      user_token: null,
      current: null,
      editing: false,

    };
  }

  // Renders
  // Main render
  render () { return (
    <View 
      label={'Process Info - '+(this.state.info!=null?this.state.info.label: '...')}
      id="v_process_info" 
      close_callback={this.onClose.bind (this)}
      editing={this.state.editing}
      edit={this.onEdit.bind (this)}
      save={this.onSave.bind (this)}
      store={this.props.store} 
      previous_view="v_products"
      previous_view_mobile="v_processes">

      <div className="outer" onClick={ev=>{ev.stopPropagation ()}}>
        <div className="image">
        </div>

        { this.state.info != null && !this.state.editing &&
          <div className="header">
            <div className="label">{this.state.info.label}</div>
            <div className="desc">{this.state.info.desc}</div>
          </div>
        }

        { this.state.info != null && this.state.editing &&
          <div className="header">
            <input type="text" id="process-info-label" placeholder="Process title" autoComplete="off" />
            <textarea id="process-info-description" placeholder="Process description" autoComplete="off" />
          </div>
        }

        <div className="body">
          <Properties store={this.props.store} editable={this.state.editing} />
          <Guide store={this.props.store} editable={this.state.editing} />
          <Notes store={this.props.store} />
        </div>
      </div>

    </View>
  )}


  // Actions
  // On close
  onClose (id) {
    setTimeout (() => {
      this.setState ({ editing: false });
      this.props.store.dispatch ( 
        set_current_process (null) 
      );
    }, 400);
  }

  // On edit
  onEdit () {
    
    // Sets state
    this.setState ({
      editing: true,
    }, _ => {

      // Sets label and description values
      let label = document.getElementById ('process-info-label');
      let description = document.getElementById ('process-info-description');

      // Sets values
      label.value = this.state.info.label;
      description.value = this.state.info.desc;

    });

  }

  // On save
  onSave () {
    
    // Fetches label and description
    let label = document.getElementById ('process-info-label').value;
    let description = document.getElementById ('process-info-description').value;

    // Saves label and description
    this.props.store.dispatch ( edit_process (
      this.state.user_token,
      this.state.current,
      { label, description }
    ));

    // Sets state
    this.setState ({
      editing: false,
    });

  }

  // Switch View
  switch (id) {
    this.props.store.dispatch (
      switch_view (id)
    );
  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let user_token = state.user.token;
    let current = state.processes.current;
    let elements = state.processes.elements;

    // Finds current element n' sets state
    if (current == null) { return; }
    let element = elements.find (e => e.id == current);

    // Sets state
    this.setState ({ 
      user_token,
      info: element,
      current,
    });

  }

  // Component did mount
  componentDidMount () {
    
    // Subscribes to store
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    );

    // Event listeners
    window.addEventListener ('click', (ev) => {
      this.onSave ();
    });

  }

  // Component will unmmount
  componentWillUnmount () {
    this.unsub ();
  }

}