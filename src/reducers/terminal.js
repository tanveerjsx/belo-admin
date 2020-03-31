import * as types from "../types/terminal";
let initialState = {
  terminals:[],
  errorMessage:''
};

const terminal = (state = initialState, action) => {
  switch (action.type) {
    case types.TERMINAL_CREATE_SUCCESS:
      let tempTerminals=[...state.terminals,action.payload]
      return {
        ...state,
        terminals: tempTerminals,
        created:true
      };
      case types.TERMINAL_CREATE_FAILURE:
      return {
        ...state,
        terminals: action.payload
      };
    default:
      return {...state};
  }
};

export default terminal;