import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FitnessCenter from '@material-ui/icons/FitnessCenter';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

let NewAccount = props => {
  const { handleSubmit } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FitnessCenter />
        </Avatar>
        <Typography component="h3" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              component={AdapterLink} to="/"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              >
              Cancel
            </Button>
          </Grid>
        </Grid>
        </form>
      </div>
    </Container>
  );
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
  })(NewAccount)