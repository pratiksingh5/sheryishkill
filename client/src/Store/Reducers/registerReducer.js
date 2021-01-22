import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_LOADING_TRUE
 } from '../actionTypes';

 const initialState = {
     errors: null,
     loading: false
 };

 export const registerReducer = (state=initialState, {type, payload}) => {
     switch (type) {
        case REGISTER_LOADING_TRUE:
            return {
                ...state,
                loading: true,
            };
         case REGISTER_SUCCESS:
             return {
                 ...state,
                 loading: false,
                 error: null
             };
            case REGISTER_FAIL:
             return {
                 ...state,
                 errors: payload,
                 loading: false
             };
         default:
             return state;
     }
 };