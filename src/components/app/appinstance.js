

// Imports
import React from 'react';
import { hot } from 'react-hot-loader';
import '../../style/base.scss';

// Main stuff
import SignIn from './signin';
import Section from './section';
import Sidebar from './sidebar';

// Product Views
import ProductsView from '../views/products.view';
import ProcessesView from '../views/processes.view';
import ProcessInfoView from '../views/process_info.view';

// Team Views
import TeamManagementView from '../views/team_management';

// Actions
import { 
  toggle_mobile, 
  switch_view 
} from '../../actions/navigation.action';


// App Instance Component
export default hot (module) (class AppInstance
  extends React.Component {

  // Constructor
  constructor (props) {
    super (props);
    this.state = {  
      
      signed_in: false,
      mobile: null,

    };
  }

  // Renders
  // Main render
  render () { return ( 
    <div id="app-instance" className={(this.state.mobile?'mobile':'')}>

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
            <Section id="s_team_management" store={this.props.store}>
              <TeamManagementView store={this.props.store} />
            </Section>

            {/* Section overlay */}
            <div className="overlay">
            </div>

          </div>

        </div>

      }
    
    </div>
  )}
  
  
  // Event listeners
  // On resize
  onResize (initial=false) {

    // Switch to desktop
    if (window.innerWidth >= 920 && this.state.mobile) {
      this.props.store.dispatch (
        toggle_mobile (false)
      );
    }

    // Switch to mobile
    if (window.innerWidth < 920 && !this.state.mobile) {
      this.props.store.dispatch ( toggle_mobile (true) );
      if (initial) { this.props.store.dispatch (switch_view ('v_products')); }
    }

  }


  // Life cycle events
  // On store change
  onStoreChange () {

    // Extracts data
    let state = this.props.store.getState ();
    let user = state.user;
    let mobile = state.navigation.mobile;

    // Sets state
    this.setState ({
      
      signed_in: user.signed_in,
      mobile

    });

  }

  // Component did mount
  componentDidMount () {
    
    // Subscribes to store
    this.unsub = this.props.store.subscribe (
      this.onStoreChange.bind (this)
    ); this.onStoreChange ();

    // Event listeners
    window.addEventListener ('resize', this.onResize.bind (this));
    this.onResize (true);

  }

  // Component will unmount
  componentWillUnmount () {
    this.unsub ();
  }

})