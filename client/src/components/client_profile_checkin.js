import React, { Component } from 'react';

export default class ClientProfileCheckin extends Component {
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
    render(){
        return (
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
        );
    }
}