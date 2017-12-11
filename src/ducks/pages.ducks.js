import { createActions, handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import {fetchPosts} from "../ducks/posts.ducks";

const FB = window.FB;



export const pagesSelector = createSelector((state, key) => state.pages['pages'] || {}, state => state);

export const currentPageSelector = createSelector((state, key) => state.pages['selectedPage'] || null, state => state);



export function fetchPages(user) {
    return dispatch => {

        return window.FB.api(
            `/me/accounts?access_token=${user.accessToken}`,
            function (response) {
                if (response && !response.error) {
                    dispatch(onPagesReceived({pages:response.data}));
                }
            }
        );
    }
}

export function updateSelectedPage(page) {
    return dispatch => {
        dispatch(onPageSelected({selectedPage: page}));
        dispatch(fetchPosts(page));
    }
}

const ON_PAGES_RECEIVED = 'ON_PAGES_RECEIVED';
const ON_PAGE_SELECTED = 'ON_PAGE_SELECTED';

// Actions
export const { onPagesReceived, onPageSelected } = createActions(
    ON_PAGES_RECEIVED,
    ON_PAGE_SELECTED
);

const defaultState = {
    pages: null,
    selectedPage: null
};

export const pages = handleActions(
    {
        [combineActions(onPagesReceived, onPageSelected)](state, { payload }) {
            return { ...state, ...payload };
        }
    },
    defaultState
);


