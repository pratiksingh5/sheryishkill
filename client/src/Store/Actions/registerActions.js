import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_LOADING_TRUE
 } from '../actionTypes';
import axios from '../../Utility/AxiosConfig';


export const registerUser = (newUser) => dispatch => {
    axios.post('users/signup', newUser)
        .then( success =>{
            return dispatch(successRegister());
        })
        .catch( fail => {
            return dispatch(failRegister(fail.response.data));
        });
};

export const successRegister = () => ({
    type: REGISTER_SUCCESS
});

export const failRegister = (err) => ({
    type: REGISTER_FAIL,
    payload: errorResolve(err)
});

export const registerLoadingTrue = () => ({
    type: REGISTER_LOADING_TRUE,
    payload: true
});

const errorResolve = (errors) => {
    let errorEntities;
    if(Array.isArray(errors)) errorEntities = errors.reduce(
        (errors, error) => ({...errors, [error.param]: error }), {});
    else errorEntities = errors;
    return errorEntities;
};


