

// Imports
import React from 'react';
import View from '../app/view';

import Properties from '../usables/properties.usable';
import Guide from '../usables/guide.usable';
import Notes from '../usables/notes.usable';

import { switch_view } from '../../actions/navigation.action';
import { set_current_process } from '../../actions/process.action';

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
      
      current: null,
      editing: false,

    };
  }

  // Renders
  // Main render
  render () { return (
    <View 
      label={'Process Info - '+this.state.info.label}
      id="v_process_info" 
      close_callback={this.onClose.bind (this)}
      edit={this.onEdit.bind (this)}
      store={this.props.store} 
      previous_view="v_products">

      <div className="image">
      </div>

      <div className="header">
        <div className="label">{this.state.info.label}</div>
        <div className="desc">{this.state.info.desc}</div>
      </div>

      <Properties store={this.props.store} />
      <Guide store={this.props.store} />
      {/* <Notes store={this.props.store} /> */}

    </View>
  )}


  // Actions
  // On close
  onClose (id) {
    setTimeout (() => {
      this.props.store.dispatch ( 
        set_current_process (null) 
      );
    }, 400);
  }

  // On edit
  onEdit () {
    this.setState ({
      editing: true,
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
    let current = state.processes.current;
    let elements = state.processes.elements;

    // Finds current element n' sets state
    if (current == null) { return; }
    let element = elements.find (e => e.id == current);

    // Sets state
    this.setState ({ 
      info: element,
      current,
    });

  }

  // Component did mount
  componentDidMount () {
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    );
  }

  // Component will unmmount
  componentWillUnmount () {
    this.unsub ();
  }

}