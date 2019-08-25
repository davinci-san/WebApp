

// Imports
import React from 'react';
import View from '../types/view';
import { switch_view } from '../actions/navigation.action';

// Products view
export default class ProcessInfoView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { };
  }

  // Renders
  // Main render
  render () { return (
    <View id="v_process_info" store={this.props.store}>
      <div onClick={this.switch.bind (this, 'v_products')}>
        Process Info: Move on {'<-'}
      </div>
    </View>
  )}

  // Actions
  // Switch View
  switch (id) {
    this.props.store.dispatch (
      switch_view (id)
    );
  }

}