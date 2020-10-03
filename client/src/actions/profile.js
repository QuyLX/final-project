import axios from 'axios';
import { setAlert } from './alert'
import {
    GET_PROFILES,
    GET_PROFILE,
    CLEAR_PROFILE,
    PROFILE_ERROR,
    ACCOUNT_DELETED,
    UPDATE_PROFILE
} from '../constants';

//get all profiles
export const getAllProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// get profile
export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        console.log(err.response.data.msg);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

// create or update profile
export const upDateProfile = (formData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    if (!edit) {
        history.push('/admin-profile');
    }
    try {
        const res = await axios.post('/api/profile', body, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch({
            type: CLEAR_PROFILE
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "error")))
        }
        dispatch(setAlert(err.message, "error"));
    }
};

//delete profile
export const deleteProfile = id => async dispatch => {
    try {
        await axios.delete(`/api/profile/${id}`);
        dispatch({
            type: ACCOUNT_DELETED,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//update mark
export const updateMark = (formData, id, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(formData);
    console.log(body);
    history.push('/mana-user-profile');
    try {
        const res = await axios.put(`/api/profile/mark/${id}`, body, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}