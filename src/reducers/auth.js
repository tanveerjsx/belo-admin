import * as types from "../types/auth";

let initialState = {
 
};

const registration = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTRATION_REQUEST:
      return {
        ...state,
        loggedInStatus: false
      };
    case types.REGISTRATION_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loggedInStatus: true,
        loginError: null,
        token: action.payload.token
      };
    case types.REGISTRATION_FAILURE:
      return {
        ...state,
        loginError: action.payload.error,
        loggedInStatus: false
      };

    case types.LOADING_START_OR_STOP:
      return {
        ...state,
        loading: action.payload
      };

    case types.LOGIN_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        user: action.payload.user,
        loggedInStatus: true,
        loginError: null,
        token: action.payload.token
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload.error,
        loggedInStatus: false
      };
    default: {
      return {...state };
    }
  }
};

export default registration;
