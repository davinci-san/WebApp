

// Imports
import React from 'react';
import View from '../app/view';
import { switch_view } from '../../actions/navigation.action';

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
    <View label="Process Info" id="v_process_info" store={this.props.store} previous_view="v_products">
      
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