import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import syncBreakpointWithStore from 'redux-breakpoint';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducer';

export const history = createHistory();

const enhancers = [];
const middleware = [thunk, routerMiddleware(history), apiMiddleware];

const devToolsExtension = window.devToolsExtension;

if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
}





const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Create store
const store = createStore(rootReducer, {}, composedEnhancers);

// Bootstrap breakpoints sync with redux store
syncBreakpointWithStore(store);



export default store;
