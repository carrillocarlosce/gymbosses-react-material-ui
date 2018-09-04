import _ from 'lodash';
import { Throttle } from 'react-throttle';
import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { fetchClients } from '../actions';

class ClientsPanel extends Component {
    componentDidMount(){
        this.props.fetchClients('someGym', '');
    }
    renderClient() {
        const { clients } = this.props;

        if (!clients) {
            return (<div>Loading...</div>)
        }

        return _.map(clients, client => {
            var state 
            var state_style
            switch (client.state) {
                case 0:
                    state = 'active';
                    state_style = 'label-success';
                    break;
                case 1:
                    state = 'debtor';
                    state_style = 'label-danger';
                    break;
                case 2:
                    state = 'inactive';
                    state_style = 'label-warning';
                    break;
            }   
            return (
                <tr key={client.client_id}>
                    <td> {client.client_id} </td>
                    <td> {`${client.name} ${client.last_name}`} </td>
                    <td><span className={`label ${state_style}`}> { state } </span></td>
                </tr>
            );
        });
    }

    onChangeSearch(term) {
        this.props.fetchClients('someGym', term);
    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <div className="box box-danger">
                        <div className="box-header">
                            <h3 className="box-title">Search Client</h3>

                            <div className="box-tools">
                                <div className="input-group input-group-sm" style={{width: '250px'}}>
                                    <Throttle time="1000" handler="onChange">
                                        <input onChange={ event => this.onChangeSearch(event.target.value) } type="text" name="table_search" className="form-control pull-right" placeholder="Search" />
                                    </Throttle>
                                    <div className="input-group-btn">
                                        <button className="btn btn-default"><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-body table-responsive no-padding">
                            <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>
                                { this.renderClient() }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {clients: state.clients};
}
        
export default connect(mapStateToProps, { fetchClients })(ClientsPanel);