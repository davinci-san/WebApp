

// Imports
import React from 'react';
import { add_note } from '../../actions/note.action';

// Notes usable
export default class Notes
  extends React.Component {

  // Constructors
  // Main constructor
  constructor (props) {
    super (props);
    this.state = {
      
      elements: [ ],
      current: null,
      uid: null,

    };
  }


  // Renders
  // Main render
  render () { return (
    <div className="notes" id="process-notes">

      <div className="add">
        <div className="title">
          New Note

          <div className="submit" onClick={this.submit.bind (this)}>
            Submit
          </div>
        </div>

        <input type="text" className="label-field" placeholder="Label" />
        <textarea className="content-field" placeholder="Content" />
      </div>

      <div className="elements">
        { this.state.elements.map (e =>
            <div className="element">
              <div className="content">
                
                <div className="author-image"></div>
                <div className="label">{e.label}</div>
                <div className="author">Aske K. Lange</div>
                <div className="value">{e.content}</div>

              </div>
            </div>
          )
        }
      </div>

    </div>
  )}


  // Actions
  submit () {
    
    // Fetches data
    let label = document.querySelectorAll ('#process-notes .label-field') [0];
    let content = document.querySelectorAll ('#process-notes .content-field') [0];

    // Dispatches action
    this.props.store.dispatch ( add_note ( 
      this.state.current, this.state.uid, 
      label.value, content.value 
    ));

    // Clears fields
    label.value = '';
    content.value = '';
  
  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let elements = state.notes.elements;
    let current = state.processes.current;
    let uid = state.user.info.id;

    // Sets state
    this.setState ({
      elements: elements.filter (e => e.pid == current).reverse (),
      current, 
      uid
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