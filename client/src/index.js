import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login";
import DashboardContainer from "./containers/dashboard";
import NewClientContainer from "./containers/new_client";
import ClientsPanelContainer from "./containers/clients_panel_container";
import ClientProfileContainer from "./containers/client_profile";
import reducers from "./reducers";
import promise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div class="hold-transition skin-black sidebar-mini">
        <Switch>
          <Route
            path="/:gymName/dashboard/clients/new"
            component={NewClientContainer}
          />
          <Route
            path="/:gymName/dashboard/clients/:id"
            component={ClientProfileContainer}
          />
          <Route
            path="/:gymName/dashboard/clients/"
            component={ClientsPanelContainer}
          />
          <Route path="/:gymName/dashboard" component={DashboardContainer} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
