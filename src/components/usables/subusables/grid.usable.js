

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
      
      elements: [ ], 
      closed: false,
      editing: false,
      removing: null,
      current: null,

    };
  }


  // Renders
  // Main render
  render () { return (

    <div className={'grid'+
        (this.state.closed?' closed':'')+
        (this.state.editing?' editable':'')} 
      id={this.props.id}>

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

        { this.state.editing &&
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
        } 
      </div>

      <div className="grid-body">
        <div className="grid-body-inner">
          { this.props.elements.length > 0 && this.props.elements.map ((e, n) => 
              <div className="grid-element" key={'grid-elemement-'+this.props.id+'#'+e.id}>

                { !this.state.editing &&
                  <div className={'fields'+(this.props.numbered?' numbered':'')+(this.props.single?' single':'')}>
                    { this.props.numbered && <div className="number">#{n+1}</div> }
                    <div className="label">{e.label}</div>
                    { !this.props.single && <div className="value">{e.value}</div> }
                  </div>
                }

                { this.state.editing &&
                  <div className={'fields editing'+(this.props.numbered?' numbered':'')+(this.props.single?' single':'')}>
                    { this.props.numbered && <div className="number">#{n+1}</div> }

                    <div className="label">
                      <input className="process-property-label" 
                        data-grid-id={e.id} 
                        placeholder="Fx. Temperature." />
                    </div>
                    
                    { !this.props.single &&
                      <div className="value">
                        <input className="process-property-value" 
                          data-grid-id={e.id}
                          placeholder="Fx. 800 °C."/>
                      </div>
                    }
                  </div>
                }

                { this.state.editing &&
                  <div className="action-buttons">

                    { this.state.removing != e.id &&
                      <div className="action-button remove"
                        onClick={ev => {
                          ev.stopPropagation (); 
                          this.setState({ removing:e.id }); 
                          clearTimeout (this.deletion_to);
                          this.deletion_to = setTimeout (_=>{ this.setState ({ removing: null })},1500);
                        }}>
                        <svg viewBox="0 0 24 24">
                          <use xlinkHref="#icon-delete">
                          </use>
                        </svg>
                      </div>
                    } 

                    { this.state.removing == e.id &&
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

                  </div>
                }

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

    // Updates fields
    if (this.props.editable && !this.state.editing) {
      
      // Sets state
      this.setState ({ editing: true }, () => {
        
        // Aliases elements and
        // fetches label and value fields
        let e = this.props.elements;
        let l = document.querySelectorAll ('#'+this.props.id+' .process-property-label[data-grid-id]');
        let v = document.querySelectorAll ('#'+this.props.id+' .process-property-value[data-grid-id]');
        
        // Sets label values
        for (let n = 0; n < l.length; n ++) {
          l[n].value = e.find (el => el.id == l[n].dataset.gridId).label;
        }

        // Sets values values
        if (!this.props.single) {
          for (let n = 0; n < v.length; n ++) {
            v[n].value = e.find (el => el.id == v[n].dataset.gridId).value;
          }
        }

      });

    } else if (!this.props.editable && this.state.editing ) {

      // Sets state
      for (let n = 0; n < this.props.elements.length; n ++) {
        this.save (this.props.elements[n]);
      } this.setState ({ editing: false });

    }

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


  // External actions
  // Add
  add (event, elem) {
    event.stopPropagation ();
    if (this.props.addCb != null) {
      this.props.addCb (elem);
    } this.toggle (false);
  }

  // Save
  save (elem) {

    // Fetches dom elements
    let label = document.querySelectorAll ('#'+this.props.id+' .process-property-label[data-grid-id="'+elem.id+'"]') [0];
    let value = document.querySelectorAll ('#'+this.props.id+' .process-property-value[data-grid-id="'+elem.id+'"]') [0];

    let lv = label.value != '' ? label.value : 'No label';
    let vv = value != null ? (value.value != '' ? value.value : 'No value') : null;

    // Callback with values
    if (this.props.saveCb != null) {
      this.props.saveCb (
        elem, lv, vv
      );
    }

  }

  // Remove
  remove (event, elem) {
    event.stopPropagation ();
    if (this.props.removeCb != null) {
      this.props.removeCb (elem);
    }
  }

}