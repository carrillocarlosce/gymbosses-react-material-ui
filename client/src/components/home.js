import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGyms, setGymID } from '../actions';

class Home extends Component {
    componentDidMount() {
        this.props.fetchGyms();
    }

    navigateTo(id){
        this.props.setGymID(id)
        this.props.history.push(id + '/dashboard');
    }

    renderGymEntry() {
        const { gyms } = this.props;
        if (!gyms) {
            return <div>Loading...</div>
        }
        return _.map(gyms, entry => {
            return (
                <li key={entry.id} onClick={(e) => this.navigateTo(entry.id)}>
                    {entry.name}
                </li>
            );
        });
    }
    render() {
        return(
            <div>
                <ul>
                    { this.renderGymEntry() }
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {gyms: state.gyms};
}
export default connect(mapStateToProps, { fetchGyms, setGymID })(Home);