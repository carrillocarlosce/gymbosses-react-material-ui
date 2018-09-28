import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createClient } from '../actions';


class NewClient extends Component {
    renderField(field, type) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return(
            <div className={ className }>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createClient('someGym', values, () => {
            this.props.history.push('/someGym/dashboard');
        });
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Create a New Client</h3>
                </div>
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <div className="box-body">
                        <Field
                        label="ID"
                        name="id"
                        component={this.renderField}
                        />
                        <Field
                        label="Name"
                        name="name"
                        component={this.renderField}
                        />
                        <Field
                        label="Last name"
                        name="last_name"
                        component={this.renderField}
                        />
                        <Field
                        label="Birthdate"
                        name="birthdate"
                        component={this.renderField}
                        />
                        <Field
                        label="Gender"
                        name="gender"
                        component={this.renderField}
                        />
                        <Field
                        label="Email"
                        name="email"
                        component={this.renderField}
                        />
                        <Field
                        label="Phone"
                        name="phone"
                        component={this.renderField}
                        />
                        <Field
                        label="Emergency contact"
                        name="emergency_contact"
                        component={this.renderField}
                        />
                        <Field
                        label="Diseases"
                        name="diseases"
                        component={this.renderField}
                        />
                        <Field
                        label="Profile pic"
                        name="profile_pic"
                        component={this.renderField}
                        />
                        <Field
                        label="How did you meet us"
                        name="meet_us"
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

function validate (values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please provide a name!';
    }

    if (!values.last_name) {
        errors.last_name = 'Please provide a last name!';
    }

    if (!values.gender) {
        errors.gender = 'Please provide a gender!';
    }

    return errors
}

export default reduxForm({
    validate,
    form: 'NewClientForm'
})(
    connect(null, { createClient })(NewClient)
);