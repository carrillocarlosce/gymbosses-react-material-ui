import React, { Component } from 'react';

export default class ClientProfilePayments extends Component {
    render(){
        return(
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
        );
    }
}