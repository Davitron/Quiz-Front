import axios from 'axios';
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  RESET_USER_STATE,
} from '../actionTypes';

import Token from './helpers/Token'
const API_URL = 'http://localhost:7000';


const checkAuth = () => (dispatch) => {
  const userToken = Token.decodeToken();
  dispatch({ type: LOGIN_PENDING });
  if (userToken.status === 'error') {
    dispatch({
      type: UNAUTH_USER
    })
  } else {
    const { 
      id,
      email
    } = userToken
    dispatch({
      type: AUTH_USER,
      id,
      email
    });
  }
}

const login = userDetails => async(dispatch) => {
    const {
    email,
    password
  } = userDetails
  dispatch({ type: LOGIN_PENDING });
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password
    });
    Token.setToken(response.data.token);
    dispatch({ type: LOGIN_SUCCESS })
  } catch (error) {
    const { data: { message } } = error.response;
    dispatch({ type: LOGIN_ERROR, message });
  }
}

const register = userDetails => async (dispatch) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = userDetails
  dispatch({ type: REGISTER_PENDING });
  try {
    const response = await axios.post(`${API_URL}/users`, {
      firstname,
      lastname,
      email,
      password
    });
    Token.setToken(response.data.token);
    dispatch({ type: REGISTER_SUCCESS,  user: response.data.newUser });
  } catch (error) {
    const { data: { message } } = error.response;
    dispatch({ type: REGISTER_ERROR, message });
  }
}

const resetUserState = () => (dispatch) => {
  dispatch({ type: RESET_USER_STATE });
}

export {
  register,
  login,
  checkAuth,
  resetUserState
}