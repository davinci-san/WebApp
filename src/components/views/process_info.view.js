

// Imports
import React from 'react';
import View from '../app/view';
import { switch_view } from '../../actions/navigation.action';
import { set_current_process } from '../../actions/process.action';
import { add_property, remove_property } from '../../actions/property.action';


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
        { this.renderGrid (this.state.properties) }
      </div>

    </View>
  )}

  // Render grid
  renderGrid (l=[]) { return (

    <div className="grid">

      <div className="grid-header">
        <div className="label">
          { l.length > 0 && 'Properties' }
          { l.length == 0 && 'No properties yet' }
        </div>

        <div className="add-new" onClick={this.addProperty.bind (this)}>
          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-add">
            </use>
          </svg>
        </div>
      </div>

      { l.length > 0 && l.map (e => 
          <div className="grid-element">

            <div className="label">{e.label}</div>
            <div className="value">{e.value}</div>

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

              <div className="action-button edit">
                <svg viewBox="0 0 24 24">
                  <use xlinkHref="#icon-edit">
                  </use>
                </svg>
              </div>

            </div>

          </div>
        )
      }
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

  // Add property
  addProperty () {
    this.props.store.dispatch (
      add_property (this.state.current)
    );
  }

  // Remove property
  removeProperty (id) {
    this.props.store.dispatch (
      remove_property (id)
    );
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

    console.log (properties);

    // Sets state
    this.setState ({ 
      info: element,
      properties,
      current,
    });

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