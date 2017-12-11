import React, { Component } from 'react';
import {connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import logo from './logo.svg';
import './App.css';
import { userSelector, getUser} from './ducks/auth.ducks'

import LoginContainer from './components/LoginContainer';
import FBPageContainer from './components/FBPageContainer';

class App extends Component {
constructor(props){
    super(props);
    this.state = {fbLoaded: false};

}
  componentDidMount(){
        this.props.getUser();
  }

    render() {
    const { user } = this.props;

    return (

          <Fabric>
              <div className="App">
                  <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo"/>
                      <h1 className="App-title">Facebook Pages Dashboard</h1>
                  </header>


                  {  user.loggedIn ? <FBPageContainer/>
                      :<LoginContainer/>

                  }



              </div>

          </Fabric>

    );

  }
}
const mapStateToProps = state => (
    {
        user: userSelector(state)
    }
);

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(
        {
            getUser
        },
        dispatch
    )
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
