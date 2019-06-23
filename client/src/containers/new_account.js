import React, { Component, Fragment } from "react";
import NewAccount from "../components/new_account";
import Auth from '../Auth/Auth.js';
import { connect } from 'react-redux';
import { createAccount } from '../actions';

class NewAccountContainer extends Component {
  submit = values => {
    const auth = new Auth();
    this.props.createAccount(values, () => {
      auth.login();
    });
  }

  render() {
    return (
      <Fragment>
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <NewAccount onSubmit={this.submit} />
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { createAccount })(NewAccountContainer)
