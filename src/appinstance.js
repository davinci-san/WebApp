

// Imports
import React from 'react';
import { hot } from 'react-hot-loader';
import './style/base.scss';

// App Instance Component
export default hot (module) (class AppInstance
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = { };
  }

  // Renders
  // Main render
  render () { return ( 
    <div className="app-instance">
      Lorem Ipsum
    </div>
  )}

})