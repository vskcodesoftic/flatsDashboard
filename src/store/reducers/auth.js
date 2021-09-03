import {Authload} from '@app/store/reducers/Authload';
import * as ActionTypes from '../actions';

export const GetCurrentUser = () => {
    const C = JSON.parse(localStorage.getItem('user'));
    return C;
};

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    currentUser: {
        email: GetCurrentUser() ? `${GetCurrentUser().email}` : '',
        picture: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            localStorage.setItem('token', action.token);

            return {
                ...state,
                isLoggedIn: true,
                token: action.token
            };
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            return {
                ...state,
                isLoggedIn: false,
                token: null,
                currentUser: {
                    email: Authload().email,
                    picture: null
                }
            };
        case ActionTypes.LOAD_USER:
            return {
                ...state,
                currentUser: action.currentUser
            };
        default:
            return {...state};
    }
};

export default reducer;
