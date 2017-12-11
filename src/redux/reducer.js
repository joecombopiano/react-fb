import { breakpointReducer } from 'redux-breakpoint';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { auth } from "../ducks/auth.ducks";
import { pages } from '../ducks/pages.ducks';

import { posts } from '../ducks/posts.ducks'

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    auth,
    pages,
    posts
});
