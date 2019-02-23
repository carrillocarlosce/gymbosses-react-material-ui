import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount } from '../actions';

class NewAccount extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createAccount('someGym', values, () => {
      this.props.history.push('/someGym/dashboard');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Create a New Account</h3>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="box-body">
            <Field
              label="Hey What's your full name?"
              name="name"
              component={this.renderField}
            />
            <Field
              label="Which Country are you from?"
              name="country"
              component={this.renderField}
            />
            <Field
              label="What's your email"
              name="email"
              component={this.renderField}
            />
            <Field
              label="Enter the password for your user (Must contain UPPER and lowercase letters, numbers, and total lenght of 8 digits)"
              name="password"
              type="password"
              component={this.renderField}
            />
            <Field
              label="Confirm the password"
              name="confirm_password"
              type="password"
              component={this.renderField}
            />
            <Field
              label="Cool, now what's the name of the Gym?"
              name="gym_name"
              component={this.renderField}
            />
            <Field
              label="How did you meet us?"
              name="how_meet_us"
              component={this.renderField}
            />
          </div>
          <div className="box-footer">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please provide a name!';
  }

  if (!values.email) {
    errors.email = 'Please provide an email! you will use this to log in';
  }

  if (!values.password) {
    errors.password = 'Please provide a password! you will use this to log in';
  }

  if (!(/[a-z]/.test(values.password)) || !(/[A-Z]/.test(values.password)) || !(/[0-9]/.test(values.password)) || values.password.length < 8) {
    errors.password = "Must contain UPPER and lowercase letters, numbers, and total lenght of 8 digits"
  }

  if (!values.confirm_password || values.password != values.confirm_password) {
    errors.confirm_password = 'The pass does not match!, please check it';
  }

  if (!values.gym_name) {
    errors.gym_name = 'You forgot the Gyms name!';
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'NewAccountForm'
})(
  connect(null, { createAccount })(NewAccount)
);