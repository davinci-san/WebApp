

// Imports
import React from 'react';

// Actions
import { 
  add_note, 
  remove_note 
} from '../../actions/note.action';


// Notes usable
export default class Notes
  extends React.Component {

  // Constructors
  // Main constructor
  constructor (props) {
    super (props);
    this.state = {

      fetching: false,
      creating: false,
      closed: false,
      deleting: null,
      
      elements: [ ],
      current: null,
      user_token: null,
      team: [ ]

    };
  }


  // Renders
  // Main render
  render () { return (
    <div className="notes" id="process-notes">

      <div className={'add'+(this.state.closed?' closed':'')}>
        <div className="header" onClick={ev=>{this.setState ({ closed: !this.state.closed })}}>
          <div className="title">
            New Note
          </div> 

          { this.state.closed &&
            <svg className="closed-icon" viewBox="0 0 24 24">
              <use xlinkHref="#icon-chevron-up">
              </use>
            </svg>
          }
          
          <div className={'submit'+(this.state.creating?' creating':'')} 
            onClick={this.submit.bind (this)}>
            
            { !this.state.creating && 
              <svg viewBox="0 0 24 24">
                <use xlinkHref="#icon-send">
                </use>
              </svg>
            }

            { this.state.creating &&
              <svg viewBox="0 0 16 16">
                <use xlinkHref="#icon-loading">
                </use>
              </svg>
            }

          </div>
        </div>

        <div className="body">
          {/* <input type="text" className="label-field" placeholder="Title" /> */}
          <textarea className="content-field" placeholder="Content" />
        </div>

        { this.state.fetching &&
          <div className="loader">
            <svg viewBox="0 0 16 16">
              <use xlinkHref="#icon-loading">
              </use>
            </svg>
          </div>
        }

      </div>

      <div className="elements">
        { this.state.elements.map (e => { return (
            <div className="element" key={e.id}>
              <div className="content">
                
                <div className="author-image"></div>
                <div className="author">
                  On {this.renderDate (e.date)},<br /> 
                  <span className="thiiick">
                    {this.getName (e.uid)} wrote:
                  </span>
                </div>

                {/* <div className="label">{e.label}</div> */}
                <div className="value">{e.content}</div>

                <div className="action-buttons">
                  <div className="inner">
                    
                    { this.state.deleting != e.id &&
                      <div className="action remove" 
                        onClick={_=>{ 
                          this.remove_to = window.setTimeout (() => {
                            this.setState ({ deleting: null }); }, 1000);
                          this.setState ({ deleting: e.id });
                        }}>

                        <svg viewBox="0 0 24 24">
                          <use xlinkHref="#icon-delete">
                          </use>
                        </svg>
                      </div>
                    }

                    { this.state.deleting == e.id &&
                      <div className="action remove"
                        onClick={this.remove.bind (this, e.id)}>
                        <svg viewBox="0 0 24 24">
                          <use xlinkHref="#icon-accept">
                          </use>
                        </svg>
                      </div>
                    }

                  </div>
                </div>

              </div>
            </div>
          )})
        }
      </div>

    </div>
  )}

  // Get name
  getName (id) {
    let t = this.state.team;
    for (let n = 0; n < t.length; n ++) {
      if (t[n].id == id) { return t[n].name; }
    } return 'User not found';
  }

  // Render date
  renderDate (date) {
    let d = new Date (date);
    return d.getDate()+'/'+(d.getMonth()+1)+' - '+d.getFullYear();
  }


  // Actions
  // Submit
  submit (ev) {
    ev.stopPropagation ();
    
    // Fetches data
    // let label = document.querySelectorAll ('#process-notes .label-field') [0];
    let content = document.querySelectorAll ('#process-notes .content-field') [0];

    // Fail states
    if (content.value == '') { return; } 

    // Dispatches action
    this.props.store.dispatch ( add_note ( 
      this.state.user_token, 
      this.state.current,
      content.value 
    ));

    // Clears fields
    content.value = '';
  
  }

  // Remove
  remove (id) {
    
    // Clears timeout
    if (this.remove_to != null) {
      window.clearTimeout (this.remove_to);
    }

    // Removes note
    this.props.store.dispatch (
      remove_note (this.state.user_token, id)
    );

  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();

    let fetching = state.notes.fetching;
    let creating = state.notes.creating;

    let elements = state.notes.elements;
    let current = state.processes.current;
    let user_token = state.user.token;
    let team = state.team.elements;

    // Sets state
    this.setState ({
      fetching, creating,
      elements: elements.filter (e => e.pid == current).reverse (),
      current, user_token, team
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