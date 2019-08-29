

// Imports
import React from 'react';

// View Component
export default class SectionComponent
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = {
      active: false,
      left: 0,
    };
  }

  // Renders
  // Main render
  render () { return (
    
    <div className={'section'+(this.state.active?' active':'')} id={this.props.id}>
      <div className="section-inner" style={{ left: (-this.state.left)+'px' }}>
        { this.props.children }
      </div>
    </div>

  )}

  // Actions
  // Translate inner
  translateInner (current_view) {
    
    // Gets the current views left and right position
    let view = document.querySelectorAll ('#'+this.props.id+' #'+current_view);
    let vleft = view.length>0 ? view[0].offsetLeft : 0;
    let vright = view.length>0 ? vleft+view[0].clientWidth : 0;

    // Gets the sections left and right position
    let outer = document.getElementById (this.props.id);
    var sleft = this.state.left;
    var sright = sleft + outer.clientWidth;

    // If the current view is the sidebar
    if (current_view == 'sidebar') {
      let appinstance = getComputedStyle (document.getElementById ('app-instance'));
      return -(parseInt (appinstance.width)/2 - 96/2);
    }

    // Compares positions, and returns left for section inner
    if (vleft-1 < sleft) { return vleft; }
    if (vright+1 > sright) { return vright-outer.clientWidth; }
    return 0;

  }

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let active = state.navigation.current_section == this.props.id;
    let left = this.translateInner (state.navigation.current_view);

    // Sets state
    this.setState ({
      active,
      left,
    });

  }

  // Component did mount
  componentDidMount () {
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    ); this.onStoreChange ();
  }

  // Component will unmount
  componentWillUnmount () {
    this.unsub ();
  }

}