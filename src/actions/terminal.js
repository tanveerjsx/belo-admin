import * as types from '../types/terminal';
export function registerTerminal(terminal) {
    return {
      type: types.TERMINAL_CREATE_REQUEST,
      payload: terminal
    };
  }
  export function registerTerminalSuccess(payload) {
    return {
      type: types.TERMINAL_CREATE_SUCCESS,
      payload
    };
  }
  
export function registerTerminalFailed(payload) {
    return {
      type: types.TERMINAL_CREATE_FAILURE,
      payload
    };
}