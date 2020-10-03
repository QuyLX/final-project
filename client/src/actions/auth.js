import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from '../actions/alert'
import {
    LOGOUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
} from '../constants'

//  load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};

// login action
export const login = (account, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ account, password });
    try {
        const res = await axios.post('api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "error")))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
};


// Create user 
export const createUser = (formData) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post('api/persons', body, config);
        dispatch(setAlert(`Create user  ${res.data.name} success`, "success"))
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "error")))
        }
        dispatch(setAlert(err.message, "error"));
    }
}

// logout action
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
