import { all, call, put, fork, takeLatest, select } from "redux-saga/effects";
import * as types from "../types/reward";
import * as service from "../services/reward";
import * as actions from "../actions/reward";
import { selectAuthToken } from "../selectors/auth";

function* registerRewardSaga(action) {
  const reward = action.payload;
  try {
    const token = yield select(selectAuthToken);
    const result = yield call(service.rewardRegister, reward, token);
    console.log(result);
    if (result.status == 200) {
      yield put(actions.registerRewardSuccess(result.data.data.newReward));
    }
  } catch (error) {
    const errorMessage = error.message;
    yield put(actions.registerRewardFailed({ error: errorMessage }));
    if (error.response) {
      const errorMessage = error.response.data.message;
    } else if (error.request) {
      yield put(
        actions.registerRewardFailed({
          error: "Error. Please check your internet connection"
        })
      );
    } else {
      yield put(actions.registerRewardFailed({ error: "There was some error" }));
    }
  }
}
function* updateRewardSaga(action) {
  const reward = action.payload;
  try {
    const token = yield select(selectAuthToken);
    const result = yield call(service.updateReward, reward, token);
    if (result.status == 200) {
      yield put(actions.updateRewardSuccess(result.data.data));
    }
  } catch (error) {
    console.log(error);
    yield put(actions.updateRewardFailed({reward }));
  }
}

function* deleteRewardSaga(action) {
  const reward = action.payload;
  try {
    const token = yield select(selectAuthToken);
    const result = yield call(service.deleteReward, reward, token);
    if (result.status == 200) {
      
      yield put(actions.deleteRewardSuccess(result.data.data));
    }
  } catch (error) {
    console.log(error);
    yield put(actions.deleteRewardFailed(reward));
  }
}

export default function* rewardWatcher() {
  yield takeLatest(types.REWARD_CREATE_REQUEST, registerRewardSaga);
  yield takeLatest(types.UPDATE_REWARD, updateRewardSaga);
  yield takeLatest(types.DELETE_REWARD, deleteRewardSaga);
}
