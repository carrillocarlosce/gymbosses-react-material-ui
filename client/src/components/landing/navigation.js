import React, { Component } from "react";

export default class LandingNavigation extends Component {
  render() {
    return (
      <nav class="colorlib-nav" role="navigation">
        <div class="top-menu">
          <div class="container">
            <div class="row">
              <div class="col-md-2 text-center">
                <div id="colorlib-logo">
                  <a href="index.html">GymBosses</a>
                </div>
              </div>
              <div class="col-md-10 text-right menu-1">
                <ul>
                  <li class="active">
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="about.html">About</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
