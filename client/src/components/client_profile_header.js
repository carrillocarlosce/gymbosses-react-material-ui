import React, { Component } from 'react';

export default class ClientProfileHeader extends Component {
    render(){
        const { client, imgStorage } = this.props;
        return(
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
        );
    }
}