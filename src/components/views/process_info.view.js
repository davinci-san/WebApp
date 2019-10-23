

// Imports
import React from 'react';
import View from '../app/view';
import { switch_view } from '../../actions/navigation.action';
import { set_current_process } from '../../actions/process.action';

import { 
  add_property, 
  remove_property, 
  edit_property
} from '../../actions/property.action';


// Products view
export default class ProcessInfoView
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { 
      
      info: { 
        label: '',
        desc: '',
      },
      
      property_deleting: null,
      property_editing: null,
      props_closed: false,
      properties: [ ],
      notes: [ ],

      current: null,
      editing: false,

    };
  }

  // Renders
  // Main render
  render () { return (
    <View 
      label={'Process Info - '+this.state.info.label}
      id="v_process_info" 
      close_callback={this.onClose.bind (this)}
      edit={this.onEdit.bind (this)}
      store={this.props.store} 
      previous_view="v_products">

      <div className="image">
      </div>

      <div className="header">
        <div className="label">{this.state.info.label}</div>
        <div className="desc">{this.state.info.desc}</div>
      </div>

      <div className="properties">
        { this.renderProperties (this.state.properties) }
      </div>

    </View>
  )}

  // Render grid
  renderProperties (l=[]) { return (

    <div className={'grid properties'+(this.state.props_closed?' closed':'')}>

      <div className="grid-header" onClick={this.toggleProps.bind (this)}>
        <div className="label">
          { l.length > 0 && 'Properties' }
          { l.length == 0 && 'No properties yet' }
        </div>

        <svg className="closed-icon" viewBox="0 0 24 24">
          <use xlinkHref="#icon-chevron-up">
          </use>
        </svg>

        <div className="add-new" onClick={this.addProperty.bind (this)}>
          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-add">
            </use>
          </svg>
        </div>
      </div>

      <div className={'grid-body'}>
        <div className="grid-body-inner">
          { l.length > 0 && l.map (e => 
              <div className="grid-element">

                { this.state.property_editing != e.id &&
                  <div className="fields">
                    <div className="label">{e.label}</div>
                    <div className="value">{e.value}</div>
                  </div>
                }

                { this.state.property_editing == e.id &&
                  <div className="fields editing">
                    <div className="label">
                      <input id="process-property-label" placeholder="Fx. Temperature." 
                        onKeyDown={ev=>{ if (ev.keyCode==13) this.saveProperty (e.id); }}/>
                    </div>
                    
                    <div className="value">
                      <input id="process-property-value" placeholder="Fx. 800 °C." 
                        onKeyDown={ev=>{ if (ev.keyCode==13) this.saveProperty (e.id); }}/>
                    </div>
                  </div>
                }

                <div className="action-buttons">

                  { this.state.property_deleting != e.id &&
                    <div className="action-button remove"
                      onClick={ev => {
                        ev.stopPropagation (); 
                        this.setState({ property_deleting:e.id }); 
                        clearTimeout (this.deletion_to);
                        this.deletion_to = setTimeout (_=>{ this.setState ({ property_deleting: null })},1500);
                      }}>
                      <svg viewBox="0 0 24 24">
                        <use xlinkHref="#icon-delete">
                        </use>
                      </svg>
                    </div>
                  }

                  { this.state.property_deleting == e.id &&
                    <div className="action-button remove"
                      onClick={ev => {
                        clearTimeout (this.deletion_to);
                        this.removeProperty (e.id);

                      }}>
                      <svg viewBox="0 0 24 24">
                        <use xlinkHref="#icon-accept">
                        </use>
                      </svg>
                    </div>
                  }

                  { this.state.property_editing != e.id &&
                    <div className="action-button edit" 
                      onClick={this.editProperty.bind (this, e.id)}>
                      <svg viewBox="0 0 24 24">
                        <use xlinkHref="#icon-edit">
                        </use>
                      </svg>
                    </div>
                  }


                  { this.state.property_editing == e.id &&
                    <div className="action-button save" 
                      onClick={this.saveProperty.bind (this, e.id)}>
                      <svg viewBox="0 0 24 24">
                        <use xlinkHref="#icon-save">
                        </use>
                      </svg>
                    </div>
                  }

                </div>

              </div>
            )
          }
        </div>
      </div>
    </div>

  )}

  // Actions
  // On close
  onClose (id) {
    setTimeout (() => {
      this.props.store.dispatch ( 
        set_current_process (null) 
      );
    }, 400);
  }

  // On edit
  onEdit () {
    this.setState ({
      editing: true,
    });
  }

  // Toggle props
  toggleProps (ev) {
    this.setState ({ 
      props_closed:!this.state.props_closed 
    });
  }

  // Resize props
  resizeProps () {

      // Sets grid height (based on whether it's open)
      let grids = document.querySelectorAll ('#v_process_info .grid');
      let bodies = document.querySelectorAll ('#v_process_info .grid-body');

      for (let n = 0; n < bodies.length; n ++) {
        bodies[n].style.height = window.getComputedStyle(bodies[n].children[0]).height;
        grids[n].style.height = parseInt(bodies[n].style.height)+64+'px';
      }

  }

  // Add property
  addProperty (ev) {
    ev.stopPropagation ();
    
    // Dispatches action
    this.props.store.dispatch (
      add_property (this.state.current)
    );

    // Opens props
    if (this.state.props_closed) {
      this.toggleProps ();
    }

  }

  // Remove property
  removeProperty (id) {
    this.props.store.dispatch (
      remove_property (id)
    );
  }

  // Edit property
  editProperty (id) {
    this.setState ({
      property_editing: id
    }, _ => {

      // Fetches input fields
      let label = document.getElementById ('process-property-label');
      let value = document.getElementById ('process-property-value');

      // Sets values
      let e = this.state.properties.find (e => e.id == id);
      label.value = e.label;
      value.value = e.value;

      // Request focus on label field
      label.focus ();

    });
  }

  // Save property
  saveProperty (id) {

    // Fetches input fields
    let label = document.getElementById ('process-property-label');
    let value = document.getElementById ('process-property-value');

    // Dispatches action
    this.props.store.dispatch (edit_property (id, {
      label: label.value,
      value: value.value
    }));

    // Sets state
    this.setState ({
      property_editing: null,
    });

  }

  // Switch View
  switch (id) {
    this.props.store.dispatch (
      switch_view (id)
    );
  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let current = state.processes.current;
    let elements = state.processes.elements;

    // Finds current element n' sets state
    if (current == null) { return; }
    let element = elements.find (e => e.id == current);

    // Filters properties
    let properties = state.properties.elements.filter (e => {
      return e.pid == current; 
    });

    // Sets state
    this.setState ({ 
      
      info: element,
      properties : properties.reverse (),
      current,

    }, this.resizeProps.bind (this));

  }

  // Component did mount
  componentDidMount () {
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    );
  }

  // Component will unmmount
  componentWillUnmount () {
    this.unsub ();
  }

}