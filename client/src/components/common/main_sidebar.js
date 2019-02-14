import React, { Component } from "react";

export default class MainSidebar extends Component {
  render() {
    return (
      <aside class="main-sidebar">
        <section class="sidebar">
          <ul class="sidebar-menu" data-widget="tree">
            <li class="treeview">
              <a href="#">
                <i class="fa fa-link" /> <span>Clients</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul class="treeview-menu">
                <li>
                  <a href="/someGym/dashboard/clients/new">Add a Client</a>
                </li>
                <li>
                  <a href="/someGym/dashboard/clients">View Clients</a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}
