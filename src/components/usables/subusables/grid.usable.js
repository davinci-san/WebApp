

// Imports
import React from 'react';

// Grid Usable
export default class Grid
  extends React.Component {

  // Constructors
  // Main constructor
  constructor (props) {
    super (props);
    this.state = {
      closed: false,
      editing: null,
      removing: null,
    };
  }


  // Renders
  // Main render
  render () { return (

    <div className={'grid'+(this.state.closed?' closed':'')} id={this.props.id}>

      { this.props.fetching &&
        <div className="loader">
          <svg viewBox="0 0 16 16">
            <use xlinkHref="#icon-loading">
            </use>
          </svg>
        </div>
      }

      <div className="grid-header" onClick={ev=>this.toggle ()}>
        <div className="label">
          { this.props.elements.length > 0 && this.props.params.label }
          { this.props.elements.length == 0 && this.props.params.empty_label }
        </div>

        <svg className="closed-icon" viewBox="0 0 24 24">
          <use xlinkHref="#icon-chevron-up">
          </use>
        </svg>

        <div className="add-new" onClick={this.add.bind (this)}>
          
          { !this.props.creating &&
            <svg viewBox="0 0 24 24">
              <use xlinkHref="#icon-add">
              </use>
            </svg>
          }

          { this.props.creating &&
            <svg viewBox="0 0 16 16" className="loader">
              <use xlinkHref="#icon-loading">
              </use>
            </svg>
          }

        </div>
      </div>

      <div className="grid-body">
        <div className="grid-body-inner">
          { this.props.elements.length > 0 && this.props.elements.map ((e, n) => 
              <div className="grid-element" key={'grid-elemement-'+this.props.id+'#'+e.id}>

                { this.state.editing != e.id &&
                  <div className={'fields'+(this.props.numbered?' numbered':'')+(this.props.single?' single':'')}>
                    { this.props.numbered && <div className="number">#{n+1}</div> }
                    <div className="label">{e.label}</div>
                    { !this.props.single && <div className="value">{e.value}</div> }
                  </div>
                }

                { this.state.editing == e.id &&
                  <div className={'fields editing'+(this.props.numbered?' numbered':'')+(this.props.single?' single':'')}>
                    { this.props.numbered && <div className="number">#{n+1}</div> }

                    <div className="label">
                      <input className="process-property-label" placeholder="Fx. Temperature." 
                        onKeyDown={ev=>{ if (ev.keyCode==13) this.save (ev, e); }}/>
                    </div>
                    
                    { !this.props.single &&
                      <div className="value">
                        <input className="process-property-value" placeholder="Fx. 800 °C." 
                          onKeyDown={ev=>{ if (ev.keyCode==13) this.save (ev, e); }}/>
                      </div>
                    }
                  </div>
                }

                <div className="action-buttons">

                  { this.state.deleting != e.id &&
                    <div className="action-button remove"
                      onClick={ev => {
                        ev.stopPropagation (); 
                        this.setState({ deleting:e.id }); 
                        clearTimeout (this.deletion_to);
                        this.deletion_to = setTimeout (_=>{ this.setState ({ deleting: null })},1500);
                      }}>
                      <svg viewBox="0 0 24 24">
                        <use xlinkHref="#icon-delete">
                        </use>
                      </svg>
                    </div>
                  }

                  { this.state.deleting == e.id &&
                    <div className="action-button remove"
                      onClick={ev => {
                        clearTimeout (this.deletion_to);
                        this.remove (ev, e);
                      }}>
                      <svg viewBox="0 0 24 24">
                        <use xlinkHref="#icon-accept">
                        </use>
                      </svg>
                    </div>
                  }

                  { this.state.editing != e.id &&
                    <div className="action-button edit" 
                      onClick={ev=>this.edit (ev, e)}>
                      <svg viewBox="0 0 24 24">
                        <use xlinkHref="#icon-edit">
                        </use>
                      </svg>
                    </div>
                  }


                  { this.state.editing == e.id &&
                    <div className="action-button save" 
                      onClick={ev=>this.save (ev, e)}>
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


  // Life cycle events
  // Component did update
  componentDidUpdate () {
    this.resize ();
  }


  // Internal actions
  // Toggle
  toggle (forced_state=!this.state.closed) {
    this.setState ({ closed: forced_state }, 
      _ => { this.resize (); });
  }

  // Resize
  resize () {

    // Fetches DOM elements
    let grid = document.getElementById (this.props.id);
    let body = document.querySelectorAll ('#'+this.props.id+' .grid-body') [0];
    let inner = body.children [0];

    if (!this.state.closed) {

      // Sets height of grid n' body
      let s = window.getComputedStyle (inner);
      grid.style.height = parseInt (s.height) + 64 + 'px';
      body.style.height = s.height;

    } else {

      // Sets height of grid n' body
      grid.style.height = '64px';
      body.style.height = '0px';

    }

  }

  // Edit
  edit (event, elem) {
    event.stopPropagation ();
    
    this.setState({ 
      editing: elem.id 
    }, _ => {

      // Fetches DOM elements
      let label = document.querySelectorAll ('#'+this.props.id+' .process-property-label') [0];
      let value = document.querySelectorAll ('#'+this.props.id+' .process-property-value') [0];

      // Sets values
      label.value = elem.label;
      if (value != null) value.value = elem.value;

      // Requests focus
      label.focus ();

    });

  }


  // External actions
  // Add
  add (event, elem) {
    event.stopPropagation ();
    if (this.props.addCb != null) {
      this.props.addCb (elem);
    } this.toggle (false);
  }

  // Save
  save (event, elem) {
    event.stopPropagation ();

    // Fetches dom elements
    let label = document.querySelectorAll ('#'+this.props.id+' .process-property-label') [0];
    let value = document.querySelectorAll ('#'+this.props.id+' .process-property-value') [0];

    // Callback with values
    if (this.props.saveCb != null) {
      this.props.saveCb (
        elem, label.value, (value!=null?value.value:null)
      );
    }

    // Sets state
    this.setState ({
      editing: null,
    });

  }

  // Remove
  remove (event, elem) {
    event.stopPropagation ();
    if (this.props.removeCb != null) {
      this.props.removeCb (elem);
    }
  }

}