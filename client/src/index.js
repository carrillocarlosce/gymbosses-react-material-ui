import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {loadState, saveState } from './persister/localstorage';
import throttle from 'lodash/throttle';

import Callback from "./components/callback";
import Home from "./components/home";

import NewAccountContainer from "./containers/new_account";
import DashboardContainer from "./containers/dashboard";
import NewClientContainer from "./containers/new_client";
import ClientsPanelContainer from "./containers/clients_panel_container";
import ClientProfileContainer from "./containers/client_profile";
import LandingContainer from "./containers/landing/landing";
import reducers from "./reducers";
import promise from "redux-promise";

const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers, persistedState);
store.subscribe(throttle(() => {
  saveState({
    gym_id: store.getState().gym_id
  });
}), 1000);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            path="/clients/new"
            component={NewClientContainer}
          />
          <Route
            path="/clients/:id"
            component={ClientProfileContainer}
          />
          <Route
            path="/clients/"
            component={ClientsPanelContainer}
          />
          <Route path="/dashboard" component={DashboardContainer} />
          <Route path="/new_account" component={NewAccountContainer} />
          <Route path="/callback" component={Callback} /> 
          <Route path="/home" component={Home} /> 
          <Route path="/" component={LandingContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container-fluid")
);