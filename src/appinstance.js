

// Imports
import React from 'react';
import { hot } from 'react-hot-loader';
import './style/base.scss';

import Section from './types/section';
import Sidebar from './components/sidebar';
import ProductsView from './components/views/products.view';
import ProcessesView from './components/views/processes.view';
import ProcessInfoView from './components/views/process_info.view';

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
    <div id="app-instance">

      {/* Sidebar */}
      <Sidebar store={this.props.store} />
      
      {/* Sections */}
      <div className="sections">

        {/* Products section */}
        <Section id="s_products" store={this.props.store}>
          <ProductsView store={this.props.store} />
          <ProcessesView store={this.props.store} />
          <ProcessInfoView store={this.props.store} />
        </Section>

        {/* Settings section */}
        <Section id="s_settings" store={this.props.store}>
          settings
        </Section>

      </div>
    
    </div>
  )}

})