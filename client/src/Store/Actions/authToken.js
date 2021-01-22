import {
    POST_SUCCESS, 
    POST_FAIL,
    CREATE_POST,
    POST_LIKE,
    POST_DISLIKE
 } from '../actionTypes';
import axios from '../../Utility/AxiosConfig';


export const timeline = () => dispatch => {
    axios.get('users/posts/timeline')
        .then( success =>{
            return dispatch(successRes(success.data));
        })
        .catch( fail => {
            return dispatch(failRes(fail.response.data));
        });
};

export const profile = () => dispatch => {
    axios.get('users/posts/profile')
        .then( success =>{
            return dispatch(successRes(success.data));
        })
        .catch( fail => {
            return dispatch(failRes(fail.response.data));
        });
};

export const createPost = (postData) => dispatch => {
    axios.post('users/posts/createpost', postData)
        .then( success =>{
            console.log(success);
            return dispatch(successCreatePost(success.data));
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(failRes(fail.response.data));
        });
};


export const likePost = (postId) => dispatch => {
    axios.post('users/posts/postlike/' + postId)
        .then( success =>{
            console.log(success);
            return dispatch(successLikePost(success.data));
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(failRes(fail.response.data));
        });
};

export const dislikePost = (postId) => dispatch => {
    axios.post('users/posts/postdislike/' + postId)
        .then( success =>{
            console.log(success);
            return dispatch(successDislikePost(success.data));
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(failRes(fail.response.data));
        });
};

export const successDislikePost = (data) => ({
    type: POST_DISLIKE,
    payload: data
});


export const successLikePost = (data) => ({
    type: POST_LIKE,
    payload: data
});

export const successCreatePost = (data) => ({
    type: CREATE_POST,
    payload: data
});

export const successRes = (posts) => ({
    type: POST_SUCCESS,
    payload: posts
});

export const failRes = (err) => ({
    type: POST_FAIL,
    payload: errorResolve(err)
});



const errorResolve = (errors) => {
    let errorEntities;
    if(Array.isArray(errors)) errorEntities = errors.reduce(
        (errors, error) => ({...errors, [error.param]: error }), {});
    else errorEntities = errors;
    return errorEntities;
};


