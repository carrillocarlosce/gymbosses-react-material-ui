import React, { Component } from "react";
import MainHeader from "../components/common/main_header";
import MainSidebar from "../components/common/main_sidebar";
import Dashboard from "../components/dashboard";

export default class DashboardContainer extends Component {
  render() {
    return (
      <div class="wrapper">
        <MainHeader />
        <MainSidebar />
        <div class="content-wrapper">
          <section class="content container-fluid">
            <Dashboard />
          </section>
        </div>
      </div>
    );
  }
}
