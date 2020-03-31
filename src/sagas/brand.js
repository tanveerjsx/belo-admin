import { all, call, put, fork, takeLatest, select } from "redux-saga/effects";
import * as types from "../types/brand.js";
import * as service from "../services/brand.js";
import * as actions from "../actions/brand.js";
import { selectAuthToken } from "../selectors/auth";

function* saveBrandSaga(action) {
  try {
    yield put(actions.saveBrand(action.payload));
  } catch (error) {
    console.log("error");
  }
}

function* registerBrandSaga(action) {
  const brand = action.payload;
  try {
    let token = yield select(selectAuthToken);
    const result = yield call(service.brandRegister, brand, token);
    console.log("result", result);
    if (result.data.status.success) {
      yield put(actions.registerBrandSuccess(result.data.data.brand));
    }
  } catch (error) {
    console.log("error", error.message);
  }
}

function* selectBrandSaga(action) {
  const brand = action.payload;
  try {
    yield put(actions.setSelectedBrand(brand));
  } catch {
    console.log("error");
  }
}

// function* updateBrandSaga(action) {
//   const brand = action.payload;
//   try {
//     const result = yield call(service.updateBrand, brand);
//     console.log("success", result);
//     yield put(actions.updateBrand(action.payload));
//     if (result.status == 200) {
//       yield put(actions.updateBrandSuccess(result.data));
//     }
//   } catch (error) {
//     console.log("error",error.message);
//   }
// }

export default function* authWatcher() {
  yield takeLatest(types.BRAND_SAVE_REQUEST, saveBrandSaga);
  yield takeLatest(types.BRAND_CREATE_REQUEST, registerBrandSaga);
  yield takeLatest(types.SET_SELECTED_BRAND, selectBrandSaga);
  // yield takeLatest(types.UPDATE_BRAND_REQUEST, updateBrandSaga);
}
