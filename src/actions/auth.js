import * as types from "../types/auth.js";


export function register(name, email, password) {
  return {
    type: types.REGISTRATION_REQUEST,
    payload: { name, email, password }
  };
}

export function loadingStartOrStop(value){
  return{
    type:types.LOADING_START_OR_STOP,
    payload:value

  }
}


export function registrationFailed(payload) {
  return {
    type: types.REGISTRATION_FAILURE,
    payload
  };
}

export function registrationSuccess(data) {
  console.log('sign up success',data)
  return {
    type: types.REGISTRATION_SUCCESS,
    payload:data
  };
}

export function login(email, password) {
  return {
    type: types.LOGIN_REQUEST,
    payload: { email, password }
  };
}


export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    payload:data
  };
}


export function loginFailed(error) {
  return {
    type: types.LOGIN_FAILURE,
    payload:error
  };
}

