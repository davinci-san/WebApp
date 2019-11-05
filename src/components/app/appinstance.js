

// Imports
import React from 'react';
import { hot } from 'react-hot-loader';
import '../../style/base.scss';

import SignIn from './signin';
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
    this.state = {  
      signed_in: false,
    };
  }

  // Renders
  // Main render
  render () { return ( 
    <div id="app-instance">

      {/* If not signed in */}
      { !this.state.signed_in &&
        <SignIn store={this.props.store} />
      }

      {/* If signed in */}
      { this.state.signed_in &&

        <div>
          {/* Sidebar */}
          <Sidebar store={this.props.store} />
          
          {/* Sections */}
          <div className="sections">

            {/* Prsoducts section */}
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

      }
    
    </div>
  )}

  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let user = state.user;

    // Sets state
    this.setState ({
      signed_in: user.signed_in
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

})