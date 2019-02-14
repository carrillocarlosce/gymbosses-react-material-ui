import React, { Component } from "react";
import MainHeader from "../components/common/main_header";
import MainSidebar from "../components/common/main_sidebar";
import ClientsPanel from "../components/clients_panel";

export default class ClientsPanelContainer extends Component {
  render() {
    return (
      <div class="wrapper">
        <MainHeader />
        <MainSidebar />
        <div class="content-wrapper">
          <section class="content container-fluid">
            <ClientsPanel />
          </section>
        </div>
      </div>
    );
  }
}
