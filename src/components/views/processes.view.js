

// Imports
import React from 'react';
import View from '../app/view';
import { set_current_product } from '../../actions/product.action';
import { new_process } from '../../actions/process.action';

// Products view
export default class ProcessesView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { 

      current: null,
      current_product: null,
      elements: [ ]

    };
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

      { this.state.elements.map (e => this.renderProcess (e) )}
      
    </View>

  )}

  // Render process
  renderProcess (e) { return (

    <div className="process" key={e.id}>
      {e.label}
    </div>

  )}


  // Actions
  // Switch View
  onClose (id) {
    setTimeout (() => {
      this.props.store.dispatch ( 
        set_current_product (null) 
      );
    }, 400);
  }

  // Add new
  addNew () {
    this.props.store.dispatch (
      new_process (this.state.current_product)
    );
  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let current = state.processes.current;
    let current_product = state.products.current;

    let elements = state.processes.elements.filter ( e => {
      return e.product_id == current_product;
    });

    // Sets state
    this.setState ({

      current, 
      current_product,
      elements

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