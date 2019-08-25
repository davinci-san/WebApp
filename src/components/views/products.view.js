

// Imports
import React from 'react';
import View from '../../types/view';
import { switch_view } from '../../actions/navigation.action';

// Products view
export default class ProductsView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { };
  }

  // Renders
  // Main render
  render () { return (
    <View label="products" id="v_products" store={this.props.store}>
      <div onClick={this.switch.bind (this, 'v_processes')}>
        {'->'}
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