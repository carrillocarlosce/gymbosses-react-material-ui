import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchClient, fetchCheckinHistory } from "../actions";
import MainHeader from "../components/common/main_header";
import MainSidebar from "../components/common/main_sidebar";
import ClientProfileHeader from "../components/client_profile_header";
import ClientProfilePayments from "../components/client_profile_payments";
import ClientProfileDetails from "../components/client_profile_details";
import ClientProfileCheckin from "../components/client_profile_checkin";

class ClientProfileContainer extends Component {
  componentDidMount() {
    this.props.fetchClient("someGym", "5892");
    this.props.fetchCheckinHistory("someGym", "5892");
  }

  render() {
    const { client, checkin } = this.props;
    if (!client || !checkin) {
      return <div>Loading...</div>;
    }
    return (
      <div class="wrapper">
        <MainHeader />
        <MainSidebar />
        <div class="content-wrapper">
          <section class="content container-fluid">
            <div>
              <div className="row">
                <ClientProfileHeader client={client} />
              </div>
              <div className="row">
                <ClientProfilePayments />
              </div>
              <div className="row">
                <div className="col-md-8">
                  <ClientProfileDetails client={client} />
                </div>
                <div className="col-md-4">
                  <ClientProfileCheckin checkin={checkin} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { client: state.clients, checkin: state.checkin };
}
export default connect(
  mapStateToProps,
  { fetchClient, fetchCheckinHistory }
)(ClientProfileContainer);
