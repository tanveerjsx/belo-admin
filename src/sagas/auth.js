import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../types/auth.js";
import * as service from "../services/auth.js";
import * as actions from "../actions/auth.js";
import * as brandActions from "../actions/brand";

function* loginSaga(action) {
  const { email, password } = action.payload;
  try {
    yield put(actions.loadingStartOrStop(true));
    const result = yield call(service.login, email, password);
    console.log("services call", result);
    if (result.data.status.success) {
      const { user } = result.data.data;
      yield put(actions.loginSuccess(result.data.data));
      yield put(actions.loadingStartOrStop(false));
      if (user.company && user.company.Brands) {
        yield put(brandActions.saveApiBrand(user.company.Brands));
      }
    } else {
      yield put(actions.loginFailed({ error: result.message }));
      yield put(actions.loadingStartOrStop(false));
    }
  } catch (error) {
    yield put(actions.loadingStartOrStop(false));
    if (error.response) {
      const errorMessage = error.response.data.message;
      yield put(actions.loginFailed({ error: errorMessage }));
    } else if (error.request) {
      yield put(
        actions.loginFailed({
          error: "Error. Please check your internet connection"
        })
      );
    } else {
      yield put(actions.loginFailed({ error: "There was some error" }));
    }
  }
}

function* registerSaga(action) {
  const { name, email, password } = action.payload;
  try {
    yield put(actions.loadingStartOrStop(true));
    const result = yield call(service.register, name, email, password);
    if (result.status == 200) {
      yield put(actions.registrationSuccess(result.data.data));
      yield put(actions.loadingStartOrStop(false));
    }
  } catch (error) {
    yield put(actions.loadingStartOrStop(false));
    if (error.response) {
      const errorMessage = error.response.data.message;
      yield put(actions.registrationFailed({ error: errorMessage }));
    } else if (error.request) {
      yield put(
        actions.registrationFailed({
          error: "Error. Please check your internet connection"
        })
      );
    } else {
      yield put(actions.registrationFailed({ error: "There was some error" }));
    }
  }
}

export default function* authWatcher() {
  yield takeLatest(types.REGISTRATION_REQUEST, registerSaga);
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
}
