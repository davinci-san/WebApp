

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
  set_current_product 
} from '../../actions/product.action';

// Processes
import { 
  new_process, 
  remove_process, 
  edit_process,
  edit_processes,
  set_current_process
} from '../../actions/process.action';


// Products view
export default class ProcessesView
  extends React.Component {

  // Initilization
  // Constructor
  constructor (props) {
    super (props);
    this.state = { 

      current: null,
      elements: [ ],

      current_product: null,
      current_product_label: '',

      editing: null,
      deleting: null,

      drag: {
        id: null,
        posx: 0,
        posy: 0,
        ox: 0,
        oy: 0,
        originx: 0,
        originy: 0,
      }

    };
  }


  // Renders
  // Main render
  render () { return (

    <View label={'Processes - '+this.state.current_product_label} 
      id="v_processes" 
      store={this.props.store} 
      previous_view="sidebar" 
      close_callback={this.onClose.bind (this)}
      add={this.newProcess.bind (this)}>

      { this.state.elements.length>0 &&
        <div className={'elements'+(this.state.drag.id!=null?' dragging':'')}>
          {this.state.elements.sort ((a,b) => {

              if (a.index == 'new' && b.index != 'new') return 1;
              if (a.index != 'new' && b.index == 'new') return -1;
              if (a.index>b.index) return 1;
              if (a.index<b.index) return -1;
              return 0;

            }).map (e => {

              // Returns container with drag placeholder
              if (this.state.drag.id == e.id) {
                return (
                  <div className="drag-container" key={'process-'+e.id}>
                    { this.renderProcess (e) }
                    <div className="drag-placeholder"></div>
                  </div>
                );
              }

              // Returns normal element
              return this.renderProcess (e) 
            
            })
          }
        </div>
      }

      { this.state.elements.length==0 &&
        <div className="no-elements">
          Start by adding a new process!
        </div>
      }
      
    </View>

  )}

  // Render process
  renderProcess (e) { return (

    <div key={e.id} className={'process'
      +(e.id==this.state.current?' active':'')
      +(e.id==this.state.drag.id?' dragging':'')} 
      data-process-id={e.id} key={'process-'+e.id}
      onClick={this.openProcess.bind (this, 'v_process_info', e.id)}
      style={this.state.drag.id==e.id?{
        'top':(this.state.drag.posy-this.state.drag.oy)+'px',
        'left':(this.state.drag.posx-this.state.drag.ox)+'px',
        'transition':'none'
      }:{}}>

      <div className="drag"
        onMouseDown={ev=>{this.dragStart (ev, e.id)}}>
          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-drag">
            </use>
          </svg>
      </div>

      { this.state.editing != e.id &&
        <div className="label">
          {e.label}
        </div>
      }

      { this.state.editing == e.id &&
        <input type="text" id="process-input-label" 
          onClick={ev=>{ev.stopPropagation()}}
          onKeyDown={ev=>{if (ev.keyCode==13) {this.saveProcess(ev, e.id)}}}
          autoComplete="off" />
      }

      <div className="actions">

        { this.state.editing != e.id &&
          <div className="action edit"
            onClick={ev=>{ this.editProcess (ev, e); }}>

            <svg viewBox="0 0 24 24" className="inner">
              <use xlinkHref="#icon-edit">
              </use>
            </svg>
          </div>
        }

        { this.state.editing == e.id &&
          <div className="action edit"
            onClick={ev=>{ this.saveProcess (ev, e.id); }}>

            <svg viewBox="0 0 24 24" className="inner">
              <use xlinkHref="#icon-save">
              </use>
            </svg>
          </div>
        }

        { this.state.deleting != e.id &&
          <div className="action remove" 
            onClick={ev=>{
              ev.stopPropagation (); 
              this.setState({ deleting:e.id }); 
              clearTimeout (this.deletion_to);
              this.deletion_to = setTimeout (_=>{ this.setState ({ deleting: null })},1500);
            }}>

            <svg viewBox="0 0 24 24" className="inner">
              <use xlinkHref="#icon-delete">
              </use>
            </svg>
          </div>
        }

        { this.state.deleting == e.id &&
          <div className="action remove" 
            onClick={ev=>{
              this.removeProcess(ev,e.id); 
              this.clearTimeout (this.deletion_to);
            }}>

            <svg viewBox="0 0 24 24" className="inner">
              <use xlinkHref="#icon-accept">
              </use>
            </svg>
          </div>
        }

      </div>

    </div>

  )}


  // Drag related
  // Drag start
  dragStart (e, id) {
    e.stopPropagation ();

    // Extracts data
    let t = e.target.getBoundingClientRect ();
    let posx = t.x;
    let posy = e.clientY;
    let oy = e.clientY - t.y;

    // Sets state
    this.setState ({
      drag: Object.assign (this.state.drag, {
        id, ox : 0, oy, posx, posy,
      })
    });

  }

  // Drag ongoing
  dragOngoing (event) {
    event.stopPropagation ();

    // Checks if the user is actually dragging
    if (this.state.drag.id == null) return;

    // State n' dom elements
    let e = this.state.elements.concat([]);
    let d = document.querySelectorAll ('.elements > .process, .drag-container > .drag-placeholder');

    // Find state element
    let ef = id => {
      for (let n = 0; n < e.length; n ++) {
        if (e[n].id == id) return n;
      }
    };

    // Does the actual calculations, loops through dom elements
    let i, br = document.querySelectorAll ('.drag-container > .process')[0].getBoundingClientRect ();
    for (let n = 0; n < d.length; n ++) {
      
      // Sets base index, gets the rect of the current dom elem,
      // and skips object currently being dragged
      if (n == 0) { i = n; }
      let sr = d[n].getBoundingClientRect ();
      if (d[n].classList.contains ('drag-placeholder')) continue;

      // Fetches id of current element
      let id = parseInt (d[n].getAttribute ('data-process-id'));

      // Checks for position
      if (br.y + br.height > sr.y + sr.height) {
        i = n+1; e[ef(id)].index = n;
      } else {
        e[ef(id)].index = n+1;
      }
    }

    // Sets base index
    e[ef (this.state.drag.id)].index = i;

    // Sets state
    this.setState ({
      drag: Object.assign (this.state.drag, {
        posy: event.clientY, elements: e,
      })
    });

  }

  // Drag end
  dragEnd (e) {
    
    e.stopPropagation ();
    if (this.state.drag.id == null) return;

    // Sets state
    this.setState ({
      drag: Object.assign (this.state.drag, {
        id: null,
      })
    }, () => {

      // Prepares fields for store action
      let elems = this.state.elements;
      let ids = [ ];
      let info = [ ];
  
      // Pushes correct indexes into those fields
      for (let n = 0; n < elems.length; n ++) {
        ids.push (elems[n].id);
        info.push ({ index: elems[n].index });
      }

      // Dispatches store action
      this.props.store.dispatch (
        edit_processes (ids, info)
      );

    });

  }


  // Actions
  // Open
  openProcess (view, pid) {
    this.props.store.dispatch ( switch_view (view) );
    this.props.store.dispatch ( set_current_process (pid) );
  }

  // New
  newProcess () {
    this.props.store.dispatch (
      new_process (this.state.current_product)
    );
  }

  // Remove
  removeProcess (ev, id) {
    ev.stopPropagation ();
    
    // If deleting open process
    if (id == this.state.current) { 
      this.props.store.dispatch (set_current_process (null)); 
      this.props.store.dispatch (switch_view ('v_products'));
    }

    // Actually removes process
    this.props.store.dispatch (remove_process (id));
  
  }

  // Edit
  editProcess (ev, element) {

    // Sets state n' sjiz
    ev.stopPropagation ();
    this.setState ({ editing: element.id }, (() => {

      // Sets input values
      let label = document.getElementById ('process-input-label');
      label.value = element.label;
      label.focus ();

    }).bind (this));

  }

  // Save
  saveProcess (ev, id) {
    
    if (ev.stopPropagation!=null) {
      ev.stopPropagation ();
    }
    
    // Extracts data
    let label = document.getElementById ('process-input-label').value;

    // Dispatches action
    this.props.store.dispatch (
      edit_process (id, {
        label
      })
    );

    // Sets state
    this.setState ({
      editing: null,
    });

  }


  // Life cycle events
  // On close
  onClose () {
    setTimeout (() => {
      this.props.store.dispatch ( 
        set_current_product (null) 
      );
    }, 400);
  }

  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let current = state.processes.current;
    let current_product = state.products.current;

    // Fetches current product label
    let current_product_label = state.products.elements.find ( e => {
      return e.id == current_product;
    });

    // Sets label to, well, the actual label
    if (current_product_label != null) {
      current_product_label = current_product_label.label;
    }

    // Filters elements
    let elements = state.processes.elements.filter ( e => {
      return e.product_id == current_product;
    });

    // Checks if pre existing.
    // If yes? use preexisting index.
    let se = this.state.elements;
    let re = elements.map ( elem => {
      let ee = se.find (e => e.id == elem.id);
      if (ee != null) { return Object.assign ({}, elem, {index:ee.index}) }
      else { return elem; }
    }); 

    // Sets state
    this.setState ({

      current, 
      elements: re,

      current_product,
      current_product_label,

    });

  }

  // Component did mount
  componentDidMount () {

    // Subscribes to store
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    );

    // Event listeners
    window.addEventListener ('mouseup', this.dragEnd.bind (this));
    window.addEventListener ('mousemove', this.dragOngoing.bind (this));

  }

  // Component will unmount
  componentWillUnmount () {
    this.unsub ();
  }

}