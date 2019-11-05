

// Imports
import React from 'react';
import View from '../app/view';


// Actions
// Navigation
import { 
  switch_view 
} from '../../actions/navigation.action';

// Products
import { 
  fetch_products,
  set_current_product, 
  new_product, 
  remove_product,
  edit_product,
} from '../../actions/product.action';

// Processes
import {
  fetch_processes
} from '../../actions/process.action';


// Products view
export default class ProductsView
  extends React.Component {

  // Initilization
  // Constructor
  constructor (props) {
    super (props);
    this.state = { 

      fetching: true,
      creating: false,

      signed_in: false,
      user_token: null,
      user_role: null,
      current: null,

      children: [ ],
      products: [ ],
      deleting: null,
      editing: null,

    };
  }

  // Renders
  // Main render
  render () { return (
    <View label="products" 
      id="v_products" 
      store={this.props.store} 
      add={this.newProduct.bind (this)}
      creating={this.state.creating}
      fetching={this.state.fetching}>

      <div className="background-icon">
        <svg viewBox="0 0 24 24">
          <use xlinkHref='#icon-products'>
          </use>
        </svg>
      </div>

      { this.state.products.length>0 &&
        <div className="all-products">
          { this.state.products.map (e => this.renderProduct (e)) }
        </div>
      }

      { this.state.products.length==0 &&
        <div className="no-elements">
          Start by adding a new product!
        </div>
      }

    </View>
  )}

  // Render product
  renderProduct (e) { return (
    <div className={'product'
      +(this.state.current==e.id?' active':'')}
      onClick={this.openProduct.bind (this, 'v_processes', e.id)}
      key={e.id}>

      <div className="container">

        <div className="left-side">
          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-products">
            </use>
          </svg>
        </div>

        { this.state.editing!=e.id &&
          <div className="right-side">
            <div className="label">{e.label}</div>
            <div className="desc">{e.description}</div>
          </div>
        }

        { this.state.editing==e.id && 
          <div className="right-side editing">
            <div className="label">
              <input type="text" id="product-input-label" autoComplete="off" 
                onClick={ev=>{ ev.stopPropagation () }}
                onKeyDown={ev=>{if (ev.keyCode==13) {this.saveProduct (ev, e.id)}}} />
            </div>

            <div className="desc">
              <textarea type="textarea" id="product-input-desc" autoComplete="off" 
                onClick={ev => { ev.stopPropagation () }} 
                onKeyUp={ev=> { if (ev.keyCode==16) {this.shift_pressed=false;} }}
                onKeyDown={ev=> {
                  
                  if (this.shift_pressed && ev.keyCode==13) { 
                    this.saveProduct (ev, e.id); 
                  } this.shift_pressed = ev.keyCode == 16;

                }} >
              </textarea>
            </div>
          </div>
        }

        { this.state.user_role == 0 &&
          <div className="actions">

            { this.state.deleting!=e.id &&
              <div className="remove action" 
                onClick={ev => { 
                  ev.stopPropagation(); 
                  this.setState ({ deleting: e.id }); 
                  clearTimeout (this.deletion_to);
                  this.deletion_to = setTimeout (_=>{this.setState({deleting:null})}, 1500); 
                }}>

                <svg viewBox="0 0 24 24" className="inner">
                  <use xlinkHref="#icon-delete">
                  </use>
                </svg>
              </div>
            }

            { this.state.deleting==e.id &&
              <div className="remove accept action" 
                onClick={ev => { 
                  clearTimeout (this.deletion_to);
                  this.removeProduct (ev, e.id); 
                }}>
                  
                <svg viewBox="0 0 24 24" className="inner">
                  <use xlinkHref="#icon-accept">
                  </use>
                </svg>
              </div>
            }

            { this.state.editing!=e.id &&
              <div className="edit action" onClick={ev => { this.editProduct (ev, e) }}>
                <svg viewBox="0 0 24 24" className="inner">
                  <use xlinkHref="#icon-edit">
                  </use>
                </svg>
              </div>
            }

            { this.state.editing==e.id &&
              <div className="save action" onClick={ev => { this.saveProduct (ev, e.id) }}>
                <svg viewBox="0 0 24 24" className="inner">
                  <use xlinkHref="#icon-save">
                  </use>
                </svg>
              </div>
            }

          </div>
        }

      </div>

    </div>
  )}

  // Actions
  // Open
  openProduct (id, pid) {
    this.props.store.dispatch ( switch_view (id) );
    this.props.store.dispatch ( set_current_product (pid) );
    this.props.store.dispatch ( fetch_processes (this.state.user_token, pid) );
  }

  // New
  newProduct () {
    this.props.store.dispatch ( new_product ( 
      this.state.user_token, 
      'New product', 
      'Product description' 
    ));
  }

  // Remove
  removeProduct ( ev, pid ) {
    
    // Removes product
    ev.stopPropagation ();
    this.props.store.dispatch (
      remove_product ( this.state.user_token, pid )
    );

    // May translate back to sidebar
    if (pid==this.state.current) {
      this.props.store.dispatch (
        switch_view ('sidebar')
      );
    }

  }

  // Edit
  editProduct ( ev, element ) {

    // Sets state n' sjiz
    ev.stopPropagation ();
    this.setState ({ editing: element.id }, (() => {

      // Sets input values
      let label = document.getElementById ('product-input-label');
      let desc = document.getElementById ('product-input-desc');
      label.value = element.label;
      desc.value = element.description;
      label.focus ();

    }).bind (this));

  }

  // Save
  saveProduct ( ev, pid ) {

    ev.stopPropagation ();

    // Fetches values
    let label = document.getElementById ('product-input-label').value;
    let description = document.getElementById ('product-input-desc').value;

    // Dispatches n' sets state
    this.props.store.dispatch ( edit_product ( this.state.user_token, pid, {
      label, description
    }));

    // Sets state
    this.setState ({ 
      editing: null 
    });
  
  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let fetching = state.products.fetching;
    let creating = state.products.creating;
    let products = state.products.elements;
    let current = state.products.current;

    let user_token = state.user.token;
    let user_role = state.user.info.role;
    
    // Gets number of children
    let children = state.processes.elements
    .map (e => e.product_id);
    
    // Fetch products related
    let x_signed_in = this.state.signed_in;
    let signed_in = state.user.signed_in;

    // Sets state
    this.setState ({

      fetching,
      creating,

      signed_in,
      user_token,
      user_role,
      
      products,
      current,
      children,
      
    }, _ => {

      // Fetches products
      if (signed_in && !x_signed_in) {
        this.props.store.dispatch (
          fetch_products (user_token)
        );
      }

    });

  }

  // Component did mount
  componentDidMount () {
    
    // Subscribes to store
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    ); this.onStoreChange ();

  }

  // Component will unmount
  componentWillUnmount () {
    this.unsub ();
  }

}