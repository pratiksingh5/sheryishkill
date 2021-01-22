import { 
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    LOGOUT,
    LOAD_USER,
    LOGIN_LOADING_TRUE
 } from '../actionTypes';
 import jwt_decode from 'jwt-decode';
 import axios from '../../Utility/AxiosConfig';

 const initialState = {
    isAuthenticated: false,
    token: null, 
    user:  null,
    errors: null,
    loading: false
 };

 export const signinReducer = (state=initialState, {type, payload}) => {
     switch (type) {
        case LOGIN_LOADING_TRUE:
            return {
                ...state,
                loading: true,
            };
        case LOAD_USER:
             return {
                 ...state,
                 token: payload,
                 isAuthenticated: true,
                 ...jwt_decode(payload),
                 loading: false,
                 errors: null
                 
             };
         case SIGNIN_SUCCESS:
             localStorage.removeItem('token');
             localStorage.setItem('token', payload.token);
             axios.defaults.headers.common = localStorage.getItem('token');
             return {
                 ...state,
                 ...payload,
                 isAuthenticated: true,
                 ...jwt_decode(payload.token),
                 loading: false,
                 errors: null
                 
             };
            case SIGNIN_FAIL:
             return {
                 ...state,
                 isAuthenticated: false,
                 errors: payload,
                 loading: false,
                 token: null,
                 user:null
             };
             case LOGOUT:    
             localStorage.removeItem('token');
             delete axios.defaults.headers.common['auth-token'];
             return {
                 isAuthenticated: false,
                 errors: null,
                 loading: false,
                 token: null,
                 user:null
             };
         default:
             return state;
     }
 };