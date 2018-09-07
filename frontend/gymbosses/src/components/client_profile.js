import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClient } from '../actions';

class ClientProfile extends Component {
    componentDidMount() {
        this.props.fetchClient('someGym', '5892');
    }

    render() {
        const imgStorage = 'https://s3-sa-east-1.amazonaws.com/gymappuy/';
        const {client} = this.props;
        if (!client) {
            return (<div>Loading...</div>);
        }
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="box box-primary">
                        <div className="box-body-centered box-profile">
                            <div className="clients-panel-profileimg-container">
                            <img className="round-image-item" src={`${imgStorage}${client.profile_pic}`} alt="User profile picture" />
                            </div>
                            <h3 className="profile-username">{`${client.name} ${client.last_name}`}</h3>

                            <p className="text-muted-12">Since August 2018</p>

                            <ul className="list-group list-group-unbordered">
                                <li className="list-group-item">
                                    <b>Status</b> <span className="pull-right">Active</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Plan</b> <span className="pull-right">SomePlan</span>
                                </li>
                            </ul>
                            <div className="btn-block">
                                <a href="#" className="btn btn-primary btn-inline"><b>Edit</b></a>
                                <a href="#" className="btn btn-danger btn-inline"><b>Delete</b></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {client: state.clients};
}
export default connect(mapStateToProps, { fetchClient })(ClientProfile);