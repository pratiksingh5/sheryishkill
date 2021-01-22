import {
   SIGNIN_FAIL,
   SIGNIN_SUCCESS,
   LOGOUT,
   LOAD_USER,
   LOGIN_LOADING_TRUE
 } from '../actionTypes';
import axios from '../../Utility/AxiosConfig';


export const signUser = (authUser,history) => dispatch => {
    axios.post('users/signin', authUser)
        .then( success =>{
            history.push('/timeline');
            return dispatch(successSignin(success.data));
        })
        .catch( fail => {
            return dispatch(failSignin(fail.response.data));
        });
};

export const editUser = (authUser) => dispatch => {
    axios.post('users/editprofile', authUser)
        .then( success =>{
            console.log(success);
            return dispatch(successSignin(success.data));
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(failSignin(fail.response.data));
        });
};

export const resetpassword = (passwords, history) => dispatch => {
    axios.post('users/resetpassword', passwords)
        .then( success =>{
            history.push('/signin');
            console.log(success);
            return dispatch(logoutUser());
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(failSignin(fail.response.data));
        });
};

export const deleteUser = (history) => dispatch => {
    axios.post('users/deleteprofile')
        .then( success =>{
            history.push('/');
            console.log(success);
            return dispatch(logoutUser());
        })
        .catch( fail => {
            return dispatch(failSignin(fail.response.data));
        });
};


export const forgetpassword = (email, history) => dispatch => {
    axios.post('users/forgetpassword', email)
        .then( success =>{
            history.push('/signin');
            return dispatch(logoutUser());
        })
        .catch( fail => {
            return dispatch(failSignin(fail.response.data));
        });
};

export const uploadImage = (updatedImage) => dispatch => {
    axios.post('users/uploadimage/', updatedImage)
        .then( success =>{
            console.log(success);
            return dispatch(successSignin(success.data));
        })
        .catch( fail => {
            return dispatch(failSignin(fail.response.data));
        });
};

// export const successSignin = (auth) => ({
//     type: SIGNIN_SUCCESS,
//     payload: auth
// });

export const successSignin = (auth) =>  dispatch => {
    return dispatch({
    type: SIGNIN_SUCCESS,
    payload: auth
    });
};

export const loadUser = (user) => ({
    type: LOAD_USER,
    payload: user
});

export const failSignin = (err) => ({
    type: SIGNIN_FAIL,
    payload: errorResolve(err)
});

export const logoutUser = () => ({
    type: LOGOUT
});

export const signinLoadingTrue = () => ({
    type: LOGIN_LOADING_TRUE,
    payload: true
});

const errorResolve = (errors) => {
    let errorEntities;
    if(Array.isArray(errors)) errorEntities = errors.reduce(
        (errors, error) => ({...errors, [error.param]: error }), {});
    else errorEntities = errors;
    return errorEntities;
};


