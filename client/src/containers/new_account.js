import React, { Component, Fragment } from "react";
import NewAccount from "../components/new_account";

export default class NewAccountContainer extends Component {
  render() {
    return (
      <Fragment>
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <NewAccount />
        </div>
      </Fragment>
    );
  }
}
