import { 
    POST_SUCCESS, 
    POST_FAIL,
    LOGOUT,
    CREATE_POST,
    POST_DISLIKE,
    POST_LIKE
 } from '../actionTypes';

 const initialState = {
     errors: null,
     loading: false,
     posts: null
 };

export const authTokenReducer = (state=initialState, {type, payload}) => {
     switch (type) {
        case POST_SUCCESS:
        case CREATE_POST: 
        case POST_LIKE:
        case POST_DISLIKE:
             return {
                 ...state,
                 loading: false,
                 error: null,
                 ...payload

             };
            case POST_FAIL:
             return {
                 ...state,
                 errors: payload,
                 loading: false
             };
             case LOGOUT:
             localStorage.removeItem('token');
             return {
                 errors: null,
                 loading: false,
                 posts: null
             };
         default:
             return state;
     }
 };