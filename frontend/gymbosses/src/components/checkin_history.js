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
                <li>
                    <img src={`${imgStorage}${entry.client_profile_pic}`} alt="User Image" />
                    <a class="users-list-name" href="#">{entry.client_name}</a>
                    <span class="users-list-date">Today</span>
                </li>
            );
        });
    }
    render() {
        return(
            <div class="row">
            <div class="col-sm-4">
                <div class="box box-danger">
                    <div class="box-header with-border">
                        <h3 class="box-title">Latest Members</h3>
                    </div>

                    <div class="box-body no-padding">
                        <ul class="users-list clearfix">
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