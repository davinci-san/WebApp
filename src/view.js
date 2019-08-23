

// Imports
import React from 'react';

// View Component
export default class ViewComponent
  extends React.Component {
  
  // Constructor
  constructor (props) {
    super (props);
    this.state = { };
  }

  // Renders
  // Main render
  render () { return (
    
    <div className="view">
      { this.props.children }
    </div>

  )}

}