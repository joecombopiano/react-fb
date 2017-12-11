import React from 'react';
import  ReactDom, {render}  from 'react-dom'
import 'react-select/dist/react-select.css';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';


    window.fbAsyncInit = function() {

        window.FB.init({
            appId      : '1635124143175488',
            xfbml      : true,
            autoLogAppEvents : true,
            version    : 'v2.11'
        });

        render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>,
                document.getElementById('root')

        );
        registerServiceWorker();

    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

