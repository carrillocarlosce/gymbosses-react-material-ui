import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGyms } from '../actions';

class Home extends Component {
    componentDidMount() {
        this.props.fetchGyms();
    }

    renderGymEntry() {
        const { gyms } = this.props;
        if (!gyms) {
            return <div>Loading...</div>
        }
        return _.map(gyms, entry => {
            return (
                <li key={entry.id}>
                    <Link to={entry.id + "/dashboard"}> {entry.name} </Link>
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
export default connect(mapStateToProps, { fetchGyms })(Home);