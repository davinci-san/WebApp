

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
      processes_fetching: false,

      signed_in: false,
      user_token: null,
      user_role: null,
      current: null,

      search_phrase: '',
      children: [ ],
      products: [ ],
      deleting: null,
      editing: null,

    };
  }

  // Renders
  // Main render
  render () { 
    
    // Filters elements
    let elements = this.state.products.filter (e => {
      return e.label.toLowerCase().includes (
        this.state.search_phrase.toLowerCase ()
      ) || e.description.toLowerCase().includes (
        this.state.search_phrase.toLowerCase ()
      );
    });

    // Returns
    return (
      <View label="products" 
        id="v_products" 
        store={this.props.store} 
        add={this.newProduct.bind (this)}
        search={this.search.bind (this)}
        creating={this.state.creating}
        fetching={this.state.fetching}>

        {/* <div className="background-icon">
          <svg viewBox="0 0 24 24">
            <use xlinkHref='#icon-products'>
            </use>
          </svg>
        </div> */}

        { elements.length>0 &&
          <div className={"all-products"+(this.state.creating?' creating':'')}>
            { elements.map (e => this.renderProduct (e)) }
          </div>
        }
        { this.state.products.length>0 && elements.length==0 &&
          <div className="no-elements">
            No products found, using the search phrase "{this.state.search_phrase}".
          </div>
        }

        { this.state.products.length==0 &&
          <div className="no-elements">
            Start by adding a new product!
          </div>
        }

      </View>
    )
  
  }

  // Render product
  renderProduct (e) { return (
    <div className={'product'
      +(this.state.current==e.id?' active':'')
      +(this.state.editing==e.id?' editing':'')}
      onClick={this.openProduct.bind (this, 'v_processes', e.id)}
      key={e.id}>

      <div className={"container"+(e.new?' new':'')}>

        <div className="background">
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
                    
                    if (!this.shift_pressed && ev.keyCode==13) { 
                      this.saveProduct (ev, e.id); 
                    } this.shift_pressed = ev.keyCode == 16;

                  }} >
                </textarea>
              </div>
            </div>
          }
        </div>

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
    if (!this.state.processes_fetching) {
      this.props.store.dispatch ( switch_view (id) );
      if (pid !== this.state.current) {
        this.props.store.dispatch ( set_current_product (pid) );
        this.props.store.dispatch ( fetch_processes (this.state.user_token, pid) );
      }
    }
  }

  // New
  newProduct () {

    // Scrolls
    let body = document.querySelectorAll ('#v_products .view-body') [0];
    let prods = document.querySelectorAll ('#v_products .all-products') [0];
    window.requestAnimationFrame (() => {
      body.scrollTop = prods.clientHeight;
    });
    
    // Resets search, n' creates new product
    this.setState ({ search_phrase: '' });
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
      
      let lv = element.label.toLowerCase() == 'new product' ? '' : element.label;
      let dv = element.description.toLowerCase() == 'product description' ? '' : element.description;

      label.value = lv;
      desc.value = dv;

      label.focus ();

    }).bind (this));

  }

  // Save
  saveProduct ( ev, pid ) {

    if (ev.stopPropagation != null) {
      ev.stopPropagation ();
    }

    // Fetches values
    let label = document.getElementById ('product-input-label').value;
    let description = document.getElementById ('product-input-desc').value;

    let lv = label != '' ? label : 'New product';
    let dv = description != '' ? description : 'Product description';

    // Dispatches n' sets state
    this.props.store.dispatch ( edit_product ( this.state.user_token, pid, {
      label: lv, description: dv
    }));

    // Sets state
    this.setState ({ 
      editing: null 
    });
  
  }


  // Search
  search (e) {
    this.setState ({
      search_phrase: e.target.value
    });
  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let processes_fetching = state.processes.fetching;
    let fetching = state.products.fetching;
    let creating = state.products.creating;
    let products = state.products.elements;
    let current = state.products.current;

    let user_token = state.user.token;
    let user_role = state.user.info.role;
    
    // Fetch products related
    let x_signed_in = this.state.signed_in;
    let signed_in = state.user.signed_in;

    // Sets state
    this.setState ({

      fetching,
      creating,
      processes_fetching,
      
      signed_in,
      user_token,
      user_role,
      
      products,
      current,
      
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

    // Event listeners
    window.addEventListener ('click', (thang) => {
      if (this.state.editing != null) {
        this.saveProduct ({}, this.state.editing);
      }
    });

  }

  // Component will unmount
  componentWillUnmount () {
    this.unsub ();
  }

}