import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCheckinHistory } from '../actions';

class CheckinHistory extends Component {
    componentDidMount() {
        this.props.fetchCheckinHistory('someGym');
    }

    renderCheckinEntry() {
        const { checkin_history } = this.props
        if (!checkin_history) {
            return <div>Loading...</div>
        }
        return _.map(checkin_history, entry => {
            return (
                <li className="list-group-item" key={entry.client_id}>
                        {entry.client_name}
                        {entry.client_last_name}
                </li>
            );
        });
    }
    render() {
        return(
            <div>
                <h3>Checkin Entries</h3>
                <ul className="list-group">
                    { this.renderCheckinEntry() }
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {checkin_history: state.checkin_history};
}
export default connect(mapStateToProps, { fetchCheckinHistory })(LogHistory);