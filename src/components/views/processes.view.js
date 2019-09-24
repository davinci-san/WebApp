

// Imports
import React from 'react';
import View from '../app/view';
import { set_current_product } from '../../actions/product.action';

// Products view
export default class ProcessesView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { };
  }

  // Renders
  // Main render
  render () { return (
    <View label="Processes" 
      id="v_processes" 
      store={this.props.store} 
      previous_view="sidebar" 
      close_callback={this.onClose.bind (this)}
      add={this.addNew.bind (this)}>
      
    </View>
  )}

  // Actions
  // Switch View
  onClose (id) {
    this.props.store.dispatch ( 
      set_current_product (null) 
    );
  }

  // Add new
  addNew () {
    return;
  }

}