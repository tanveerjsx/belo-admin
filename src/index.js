/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// plugins styles downloaded
import "assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/select2/dist/css/select2.min.css";
import "assets/vendor/quill/dist/quill.core.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.0.0";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import IndexView from "views/Index.jsx";
import Register from "./views/mycomponents/register/Register";
import Login from "./views/mycomponents/loginPage/Login";
import CreateBrand from "./views/mycomponents/createBrand/CreateBrand";
import CompanyBrandName from "./views/mycomponents/brandName/CompanyBrandName";

import authWatcher from "./sagas/auth.js";
import brandWatcher from "./sagas/brand.js";
import branchWatcher from './sagas/branch';
import terminalWatcher from './sagas/terminal';
import rewardWatcher from './sagas/reward';
// import ReactDOM from 'react-dom'

import { Provider } from "react-redux";
// import store from './store'
// import Register from "./views/mycomponents/register/Register"
import combineReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { fork, all } from "redux-saga/effects";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/lib/integration/react';
// import AccountInformation from "./views/pages/AccountInformation";
// import { AccountInformation } from "@fullcalendar/core";

// import reducer from './reducers'

function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(brandWatcher),
    fork(branchWatcher),
    fork(terminalWatcher),
    fork(rewardWatcher)
    ]);
}

const persistConfig = {
  key: "root",
  storage: storage
};

const sagaMiddleware = createSagaMiddleware();

let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware)
  );
} else {
  enhancer = compose(applyMiddleware(sagaMiddleware));
}

const pReducer = persistReducer(persistConfig, combineReducer);

const store = createStore(pReducer, enhancer);
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/admin" to="/admin/dashboard" />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route
          path="/createBrand"
          render={props => <CreateBrand {...props} />}
        />
        <Route
          path="/companyBrandName"
          render={props => <CompanyBrandName {...props} />}
        />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/" render={props => <Register {...props} />} />

        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
