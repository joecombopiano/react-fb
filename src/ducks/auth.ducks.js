import { createActions, handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';

const FB = window.FB;




export const userSelector = createSelector((state, key) => state.auth || {}, state => state);




export function getUser() {
    return dispatch => {
        if(window.FB) {
            window.FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {

                    const {accessToken, userID} = response.authResponse;

                    dispatch(onAuthReceived({accessToken, userID, loggedIn: true}));

                } else if (response.status === 'not_authorized') {
                    dispatch(onAuthReceived({accessToken: null, userID: null, loggedIn: false}));
                } else {
                    dispatch(onAuthReceived({accessToken: null, userID: null, loggedIn: false}));
                }
            });

        }
    }
}


const ON_AUTH_RECEIVED = 'ON_AUTH_RECEIVED';


// Actions
export const { onAuthReceived } = createActions(
    ON_AUTH_RECEIVED
);


const defaultState = {
    accessToken: null,
    userID: null,
    loggedIn: false
};

export const auth = handleActions(
    {
        [combineActions(onAuthReceived)](state, { payload }) {
            return { ...state, ...payload };
        }
    },
    defaultState
);


