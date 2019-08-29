

// Imports
import React from 'react';
import View from '../app/view';
import { switch_view } from '../../actions/navigation.action';

// Products view
export default class ProductsView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { 
      products: [
        {
          label: 'Lorem',
          description: 'Ipsum',
          processes: 22,
        },
        {
          label: 'Lorem',
          description: 'Ipsum',
          processes: 8,
        },
        {
          label: 'Lorem',
          description: 'Ipsum',
          processes: 12,
        },
      ]
    };
  }

  // Renders
  // Main render
  render () { return (
    <View label="products" id="v_products" store={this.props.store} previous_view="sidebar">

      <div className="add-new">
        <div className="add-new-inner">
          Add new product
        </div>
      </div>

      <div className="all-products">
        { this.state.products.map (e => this.renderProduct (e)) }
      </div>

    </View>
  )}

  // Render product
  renderProduct (e) { return (
    <div className="product" onClick={this.switch.bind (this, 'v_processes')}>
      <div className="left-side">
        <div className="overlay"></div>
        <div className="processes">{e.processes}</div>
      </div>

      <div className="right-side">
        <div className="label">{e.label}</div>
        <div className="desc">{e.description}</div>
      </div>
    </div>
  )}

  // Actions
  // Switch View
  switch (id) {
    this.props.store.dispatch (
      switch_view (id)
    );
  }

}