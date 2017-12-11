import {createAction, handleActions, combineActions} from 'redux-actions';
import {createSelector} from 'reselect';

const FB = window.FB;


export const postsSelector = createSelector((state, key) => state.posts.posts || null, state => state);


const ON_POSTS_RECEIVED = 'ON_POSTS_RECEIVED';

const onPostsReceived = createAction(ON_POSTS_RECEIVED);

export function fetchPosts(page) {
    return dispatch => {
        const promises = [];

        promises.push(new Promise((resolve, reject) => {
            return window.FB.api(
                `/${page.id}/promotable_posts?access_token=${page.access_token}&include_hidden=true&is_published=false&fields=id,is_published,message,created_time,scheduled_publish_time`,
                function (response) {
                    if (response && !response.error) {
                        resolve(response.data);
                    }
                }
            );
        }));
        promises.push(new Promise((resolve, reject) => {
            return window.FB.api(
                `/${page.id}/feed?access_token=${page.access_token}&fields=id,message,created_time,scheduled_publish_time,is_published`,
                function (response) {
                    if (response && !response.error) {
                        resolve(response.data);
                    }
                }
            );
        }));
        Promise.all(promises).then(results => {
            const posts = [...results[0], ...results[1]];
            getPostViews(posts, page.access_token).then(posts => {
                dispatch(onPostsReceived({posts: posts}));
            });
        });

    }
}


function getPostViews(posts, access_token) {
    return new Promise((resolve, reject) => {
        const promises = [];
        posts.forEach(post => {
            promises.push(new Promise((resolve, reject) => {
                window.FB.api(
                    `/${post.id}/insights/post_impressions_unique?access_token=${access_token}`,
                    function (response) {
                        if (response && !response.error) {
                            post.views = response.data && response.data.filter(i => i.name === 'post_impressions_unique').map(i => (i.values ? i.values[0].value : 0))[0];

                            resolve({...post});
                        } else {
                            reject(response.error);
                        }
                    }
                );
            }));
        });
        Promise.all(promises).then(result => {
            resolve(result);
        }).catch(error => reject(error));
    });

}

export function addPost(post, page) {
    return new Promise((resolve, reject) => {
        window.FB.api(
            `/${page.id}/feed?access_token=${page.access_token}`,
            "POST",
            {
                ...post
            },
            function (response) {
                if (response && !response.error) {
                    resolve(response);
                } else {
                    reject(response.error);
                }
            }
        );
    });

}

const defaultState = {};

export const posts = handleActions(
    {
        [combineActions(onPostsReceived)](state, {payload}) {
            return {...state, ...payload};
        }
    },
    defaultState
);

