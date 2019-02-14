import React, { Component } from "react";
import MainHeader from "../components/common/main_header";
import MainSidebar from "../components/common/main_sidebar";
import NewClient from "../components/new_client";

export default class NewClientContainer extends Component {
  render() {
    return (
      <div class="wrapper">
        <MainHeader />
        <MainSidebar />
        <div class="content-wrapper">
          <section class="content container-fluid">
            <NewClient />
          </section>
        </div>
      </div>
    );
  }
}
