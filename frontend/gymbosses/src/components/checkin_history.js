import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCheckinHistory } from '../actions';

class CheckinHistory extends Component {
    componentDidMount() {
        this.props.fetchCheckinHistory('someGym');
    }

    renderCheckinEntry() {
        const imgStorage = 'https://s3-sa-east-1.amazonaws.com/gymappuy/';
        const { checkin_history } = this.props;
        if (!checkin_history) {
            return <div>Loading...</div>
        }
        return _.map(checkin_history, entry => {
            return (
                <li key={entry.client_id}>
                    <img src={`${imgStorage}${entry.client_profile_pic}`} alt="User Image" />
                    <a className="users-list-name" href="#">{entry.client_name}</a>
                    <span className="users-list-date">{entry.date}</span>
                </li>
            );
        });
    }
    render() {
        return(
            <div className="row">
                <div className="col-md-4">
                    <div className="box box-danger">
                        <div className="box-header with-border">
                            <h3 className="box-title">Latest Members</h3>
                        </div>

                        <div className="box-body no-padding">
                            <ul className="users-list clearfix">
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
    return {checkin_history: state.checkin_history};
}
export default connect(mapStateToProps, { fetchCheckinHistory })(CheckinHistory);