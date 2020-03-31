import { all, call, put, fork, takeLatest, select } from "redux-saga/effects";
import * as types from "../types/terminal";
import * as service from "../services/terminal";
import * as actions from "../actions/terminal";
import {selectAuthToken} from '../selectors/auth';

function* registerterminalSaga(action) {
  const terminal  = action.payload;
  try {
    const token=yield select(selectAuthToken);
    console.log(token)
    const result = yield call(service.terminalRegister, terminal,token);
    if (result.status == 200) {
         yield put(actions.registerTerminalSuccess(result.data.data));
    }
  } catch (error) {
    const errorMessage=error.message;
    yield put(actions.registerTerminalFailed({ error: errorMessage }));
    if (error.response) {
        const errorMessage = error.response.data.message;
    } else if (error.request) {
        yield put(actions.registerTerminalFailed({ error: "Error. Please check your internet connection" }));
    } else {
        yield put(actions.registerTerminalFailed({ error: "There was some error" }));
    }
  }
  
}

export default function* terminalWatcher() {
  yield takeLatest(types.TERMINAL_CREATE_REQUEST,registerterminalSaga);
}