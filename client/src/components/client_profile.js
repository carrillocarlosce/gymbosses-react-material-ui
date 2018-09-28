import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClient, fetchCheckinHistory } from '../actions';

class ClientProfile extends Component {
    componentDidMount() {
        this.props.fetchClient('someGym', '5892');
        this.props.fetchCheckinHistory('someGym', '5892');
    }

    renderCheckinEntry() {
         const { checkin } = this.props;
         if (!checkin) {
             return <div>Loading...</div>
         }
        return _.map(checkin, entry => {
            var checkin_history_icon = entry.state == 1? "fa fa-check bg-green" : "fa fa-bomb bg-red"
            return (
                <li key={entry.date}>
                    <i className={checkin_history_icon}></i>
                    <div className="timeline-item">
                        <span className="clients-panel-checkin-time"> {entry.date}  <i className="far fa-clock"></i></span>
                    </div>
                </li>
            );
        });
    }

    render() {
        const imgStorage = 'https://s3-sa-east-1.amazonaws.com/gymappuy/';
        const {client} = this.props;
        if (!client) {
            return (<div>Loading...</div>);
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-widget widget-user">
                
                        <div className="widget-user-header bg-aqua-active">
                            <h3 className="widget-user-username">{`${client.name} ${client.last_name}`}</h3>
                        </div>
                        <div className="widget-user-image">
                            <div className="clients-panel-profileimg-container">
                                <img className="round-image-item" src={`${imgStorage}${client.profile_pic}`} alt="User Avatar" />
                            </div>
                        </div>
                            <div className="box-footer">
                                <div className="row">
                                    <div className="col-sm-12 border-right">
                                        <div className="description-block">
                                            <h5 className="description-header success">{client.state}</h5>
                                            <span className="description-text">13 Aug. 2018 - 13 Sep. 2018</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h5 className="box-title">Payments</h5>
                            </div>
                            <div className="box-body no-padding">
                                <table className="table table-striped">
                                    <tbody>
                                    <tr>
                                        <th>Date</th>
                                        <th>Period</th>
                                        <th>Plan</th>
                                        <th>Amount</th>
                                    </tr>
                                    <tr>
                                        <td>13/8/18</td>
                                        <td>13/8/18 - 13/9/18</td>
                                        <td>sala-aparatos-libre</td>
                                        <td>700</td>
                                    </tr>
                                    <tr>
                                        <td>13/8/18</td>
                                        <td>13/8/18 - 13/9/18</td>
                                        <td>sala-aparatos-libre</td>
                                        <td>700</td>
                                    </tr>
                                    <tr>
                                        <td>13/8/18</td>
                                        <td>13/8/18 - 13/9/18</td>
                                        <td>sala-aparatos-libre</td>
                                        <td>700</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="box-footer clearfix">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
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
                    </div>
                    <div className="col-md-4">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h5 className="box-title">Checkins in the last 30 days</h5>
                            </div>
                            <div className="box-body">
                                <ul className="timeline">
                                    {this.renderCheckinEntry()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                
        );
    }
}

function mapStateToProps(state){
    return {client: state.clients, checkin: state.checkin};
}
export default connect(mapStateToProps, { fetchClient, fetchCheckinHistory })(ClientProfile);