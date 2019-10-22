

// Imports
import React from 'react';
import { hot } from 'react-hot-loader';
import '../../style/base.scss';

import Section from './section';
import Sidebar from './sidebar';
import ProductsView from '../views/products.view';
import ProcessesView from '../views/processes.view';
import ProcessInfoView from '../views/process_info.view';

import { sign_in } from '../../actions/user.action';

// App Instance Component
export default hot (module) (class AppInstance
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = {  };
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

  // Life cycle events
  // Component did mount
  componentDidMount () {
    this.props.store.dispatch ( sign_in ({
      role: 0, mail: '', 
    }, null ))
  }

})