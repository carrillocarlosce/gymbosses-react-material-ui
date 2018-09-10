import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCheckinHistory } from '../actions';

class CheckinHistory extends Component {
    componentDidMount() {
        this.props.fetchCheckinHistory('someGym', '');
    }

    renderCheckinEntry() {
        const imgStorage = 'https://s3-sa-east-1.amazonaws.com/gymappuy/';
        const { checkin } = this.props;
        if (!checkin) {
            return <div>Loading...</div>
        }
        return _.map(checkin, entry => {
            var checkin_history_icon = entry.state == 1? "fa fa-check bg-green" : "fa fa-bomb bg-red"
            return (
                <li key={entry.client_id}>
                <i className={checkin_history_icon}></i>
                <div className="timeline-item">
                    <span className="time"><i className="far fa-clock"></i> {entry.date}</span>

                    <h3 className="timeline-header">
                        <div className="timeline-header-image">
                        <img className="round-image-item" src={`${imgStorage}${entry.profile_pic}`} alt="User Image" />
                        </div>
                        <a href={`clients/${entry.client_id}`}>{`${entry.name} ${entry.last_name}`}</a>
                    </h3>
                </div>
                </li>
            );
        });
    }
    render() {
        return(
            <div className="row">
                <div className="col-md-6">
                    <div className="box box-danger">
                        <div className="box-header with-border">
                            <h3 className="box-title">Latest Members</h3>
                        </div>

                        <div className="box-body no-padding">
                            <ul className="timeline">
                                { this.renderCheckinEntry() }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {checkin: state.checkin};
}
export default connect(mapStateToProps, { fetchCheckinHistory })(CheckinHistory);