import React, { Component } from 'react';

export default class ClientProfileDetails extends Component {
    render(){
        const { client } = this.props;
        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h5 className="box-title">Client Info</h5>
                    <div className="box-tools">
                        <button type="button" className="btn btn-box-tool" tooltip="Edit Client"><i className="fa fa-edit"/></button>
                        <button type="button" className="btn btn-box-tool" tooltip="Delete Client"><i className="fa fa-trash"/></button>
                    </div>
                </div>
                <div className="box-body">
                    <form role="form">
                        <div className="form-group">
                            <label>ID</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" placeholder={client.client_id} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                <input type="text" className="form-control" placeholder={client.birthdate} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                <input type="email" className="form-control" placeholder={client.email} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                <input type="text" className="form-control" placeholder={client.phone} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Contact Phone</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                <input type="text" className="form-control" placeholder={client.emergency_contact} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Medical Insurance</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-hospital"></i></span>
                                <input type="text" className="form-control" placeholder={client.medical_insurance} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Medical Emergency</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-ambulance"></i></span>
                                <input type="text" className="form-control" placeholder={client.medical_emergency} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Diseases</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-stethoscope"></i></span>
                                <input type="text" className="form-control" placeholder={client.diseases} disabled />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>How did you meet us?</label>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-child"></i></span>
                                <input type="text" className="form-control" placeholder={client.meet_us} disabled />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}