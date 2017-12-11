import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, userSelector} from "../ducks/auth.ducks";


class LoginContainer extends Component {

    constructor(props){
        super(props);
        this.checkUser = this.checkUser.bind(this);
    }
    componentDidMount(){
        window.FB.Event.subscribe('auth.authResponseChange', this.checkUser);

    }

    checkUser(){

        this.props.getUser();
    }

    render(){
        return (
            <div className="login-container">
                <h3>Sign in to get started</h3>
                <div className="fb-login-button" data-max-rows="1"  data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>

            </div>
        )
    }

}

const mapStateToProps = state =>(
    {
        user: userSelector(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);