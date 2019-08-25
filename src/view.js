

// Imports
import React from 'react';

// View Component
export default class ViewComponent
  extends React.Component {

  // Renders
  // Main render
  render () { return (
    
    <div className="view" id={this.props.id}>
      { this.props.children }
    </div>

  )}

}