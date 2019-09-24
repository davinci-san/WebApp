

// Imports
import React from 'react';
import View from '../app/view';
import { switch_view } from '../../actions/navigation.action';

import { 
  set_current_product, 
  new_product, 
  remove_product,
  edit_product,
} from '../../actions/product.action';

// Products view
export default class ProductsView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { 

      user_role: null,
      current: null,
      
      products: [ ],
      deleting: null,
      editing: null,

      
    };
  }

  // Renders
  // Main render
  render () { return (
    <View label="products" id="v_products" store={this.props.store} add={this.addNew.bind (this)}>

      <div className="all-products">
        { this.state.products.map (e => this.renderProduct (e)) }
      </div>

    </View>
  )}

  // Render product
  renderProduct (e) { return (
    <div className={'product'
      +(this.state.current==e.id?' active':'')
      +(this.state.deleting==e.id?' deleting':'')} 

      onClick={this.openProduct.bind (this, 'v_processes', e.id)}
      key={e.id}>

      <div className="container">

        <div className="left-side">
          <div className="overlay"></div>
          <div className="processes">{e.processes}</div>
        </div>

        { this.state.editing!=e.id &&
          <div className="right-side">
            <div className="label">{e.label}</div>
            <div className="desc">{e.desc}</div>
          </div>
        }

        { this.state.editing==e.id && 
          <div className="right-side editing">
            <div className="label">
              <input type="text" id="product-input-label" autoComplete="off" 
                onClick={ev => { ev.stopPropagation () }} />
            </div>

            <div className="desc">
              <textarea type="textarea" id="product-input-desc" autoComplete="off" 
                onClick={ev => { ev.stopPropagation () }} >
              </textarea>
            </div>
          </div>
        }

        { this.state.user_role == 0 &&
          <div className="actions">
            <div className="remove action" onClick={ev => { ev.stopPropagation(); this.setState ({ deleting: e.id }) }}>
              <svg viewBox="0 0 24 24" class="inner">
                <use xlinkHref="#icon-delete">
                </use>
              </svg>
            </div>

            { this.state.editing!=e.id &&
              <div className="edit action" onClick={ev => { this.edit (ev, e) }}>
                <svg viewBox="0 0 24 24" class="inner">
                  <use xlinkHref="#icon-edit">
                  </use>
                </svg>
              </div>
            }

            { this.state.editing==e.id &&
              <div className="save action" onClick={ev => { this.save (ev, e.id) }}>
                <svg viewBox="0 0 24 24" class="inner">
                  <use xlinkHref="#icon-save">
                  </use>
                </svg>
              </div>
            }

          </div>
        }

      </div>

      <div className="warning">
        <div className="inner">
          <div className="response">
            <div className="agree" onClick={ev => { this.remove (ev, e.id); }}>
              Delete
            </div>
            
            <div className="disagree" onClick={ev => { ev.stopPropagation (); this.setState ({ deleting: null }); }}>
              Cancel
            </div>
          </div>
        </div>
      </div>

    </div>
  )}

  // External Actions
  // Switch View
  openProduct (id, pid) {
    this.props.store.dispatch ( switch_view (id) );
    this.props.store.dispatch ( set_current_product (pid) );
  }

  // Add new
  addNew () {
    this.props.store.dispatch (
      new_product ( 'New Product', 'Lorem ipsum' )
    );
  }

  // Internal Actions
  // Remove
  remove ( ev, pid ) {
    
    // Removes product
    ev.stopPropagation ();
    this.props.store.dispatch (
      remove_product ( pid )
    );

    // May translate back to sidebar
    if (pid==this.state.current) {
      this.props.store.dispatch (
        switch_view ('sidebar')
      );
    }

  }

  // Edit
  edit ( ev, element ) {

    // Sets state n' sjiz
    ev.stopPropagation ();
    this.setState ({ editing: element.id }, (() => {

      // Checks if fields active
      let label = document.getElementById ('product-input-label');
      let desc = document.getElementById ('product-input-desc');
      label.value = element.label;
      desc.value = element.desc;

    }).bind (this));

  }

  // Save
  save ( ev, pid ) {

    ev.stopPropagation ();

    // Fetches values
    let label = document.getElementById ('product-input-label').value;
    let desc = document.getElementById ('product-input-desc').value;

    // Dispatches n' sets state
    this.props.store.dispatch ( edit_product ( pid, label, desc ) );
    this.setState ({ editing: null });
  
  }

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let products = state.products.elements;
    let current = state.products.current;
    let user_role = state.user.info.role;

    // Sets state
    this.setState ({ 
      products,
      current,
      user_role,
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