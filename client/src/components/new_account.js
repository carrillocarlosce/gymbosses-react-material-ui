import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount } from '../actions';
import Auth from '../Auth/Auth.js';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

class NewAccount extends Component {
  onSubmit(values) {
    const auth = new Auth();
    this.props.createAccount(values, () => {
      auth.login();
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h3" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              label="Hey What's your full name?"
              name="name"
              component={renderTextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Which Country are you from?"
              name="country"
              component={renderTextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="What's your email"
              name="email"
              component={renderTextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Enter the password"
              name="password"
              type="password"
              component={renderTextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Confirm the password"
              name="confirm_password"
              type="password"
              component={renderTextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Cool, now what's the name of the Gym?"
              name="gym_name"
              component={renderTextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="How did you meet us?"
              name="how_meet_us"
              component={renderTextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <div className="box-footer">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </div>
        </Grid>
        </form>
      </Container>
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

export default withRouter(reduxForm({
  validate,
  form: 'NewAccountForm'
})(
  connect(null, { createAccount })(NewAccount)
));