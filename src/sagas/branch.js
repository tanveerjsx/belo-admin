import { all, call, put, fork, takeLatest, select } from "redux-saga/effects";
import * as types from "../types/branch";
import * as service from "../services/branch";
import * as actions from "../actions/branch";
import { selectAuthToken } from "../selectors/auth";

function* registerBranchSaga(action) {
  const branch = action.payload;
  try {
    const token = yield select(selectAuthToken);
    const result = yield call(service.branchRegister, branch, token);
    if (result.status == 200) {
      yield put(actions.registerBranchSuccess(result.data.data));
    }
  } catch (error) {
    console.log(error);
    yield put(actions.registerBranchFailed({ branch }));
  }
}
function* updateBranchSaga(action) {
  const branch = action.payload;
  try {
    const token = yield select(selectAuthToken);
    const result = yield call(service.updateBranch, branch, token);
    if (result.status == 200) {
      yield put(actions.updateBranchSuccess(result.data.data));
    }
  } catch (error) {
    console.log(error);
    yield put(actions.updateBranchFailed(branch));
  }
}

function* deleteBranchSaga(action) {
  const branch = action.payload;
  try {
    const token = yield select(selectAuthToken);
    const result = yield call(service.deleteBranch, branch, token);
    if (result.status == 200) {
      yield put(actions.deleteBranchSuccess(result.data.data));
    }
  } catch (error) {
    console.log("error");
    yield put(actions.deleteBranchFailed(branch));
  }
}

export default function* branchWatcher() {
  yield takeLatest(types.BRANCH_CREATE_REQUEST, registerBranchSaga);
  yield takeLatest(types.UPDATE_BRANCH, updateBranchSaga);
  yield takeLatest(types.DELETE_BRANCH, deleteBranchSaga);
}
